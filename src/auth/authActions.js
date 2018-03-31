import Cookie from 'js-cookie';
import { createAction } from 'redux-actions';
import { getAuthenticatedUserName, getIsAuthenticated } from '../reducers';
import { getAccount } from '../helpers/apiHelpers';
import { getFollowing } from '../user/userActions';
import busyAPI from '../busyAPI';
import { createAsyncActionType } from '../helpers/stateHelpers';
import { getDrafts } from '../helpers/localStorageHelpers';
import * as request from 'superagent';
import sc2 from '../sc2';

export const LOGIN = '@auth/LOGIN';
export const LOGIN_START = '@auth/LOGIN_START';
export const LOGIN_SUCCESS = '@auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = '@auth/LOGIN_ERROR';

export const RELOAD = '@auth/RELOAD';
export const RELOAD_START = '@auth/RELOAD_START';
export const RELOAD_SUCCESS = '@auth/RELOAD_SUCCESS';
export const RELOAD_ERROR = '@auth/RELOAD_ERROR';

export const LOGOUT = '@auth/LOGOUT';
export const LOGOUT_START = '@auth/LOGOUT_START';
export const LOGOUT_ERROR = '@auth/LOGOUT_ERROR';
export const LOGOUT_SUCCESS = '@auth/LOGOUT_SUCCESS';

export const UPDATE_SC2_USER_METADATA = createAsyncActionType('@auth/UPDATE_SC2_USER_METADATA');
export const BUSY_LOGIN = createAsyncActionType('@auth/BUSY_LOGIN');
export const UPDATE_AUTH_USER = createAsyncActionType('@auth/UPDATE_AUTH_USER');
export const login = () => (dispatch) => {
  dispatch({
    type: LOGIN,
    payload: {
      promise: sc2.profile()
        .then((resp) => {
          // console.log("RESP", resp)

          if (resp && resp.user) {
            dispatch(getFollowing(resp.user));

            /*setTimeout(function() {
              const script = document.createElement("script");

              console.log("ACCOUNT ID", resp.account.id);

              window.chat_name = resp.user;
              window.chat_id = resp.account.id;
              window.chat_avatar = getImage(`@${resp.user}?s=${68}`);
              window.chat_link = `https://utopian.io/@${resp.user}`;
              window.chat_role = 'default';

              script.src = "https://fast.cometondemand.net/11410x_x1fa73.js";

              document.body.appendChild(script);
            }, 3000);*/
          }

          if (window.ga) {
            window.ga('set', 'userId', resp.user);
          }

          //initPushpad(resp.user, Cookie.get('access_token'));
          resp.drafts = getDrafts();
          return resp;
        })
    }
  });
};

const loginError = createAction(LOGIN_ERROR);

export const login_v2 = () => (dispatch) => {
  let promise = sc2.profile().catch(() => dispatch(loginError()));

  return dispatch({
    type: LOGIN,
    payload: {
      promise,
    },
  }).catch(() => dispatch(loginError()));
};

export const reload = () => dispatch =>
  dispatch({
    type: RELOAD,
    payload: {
      promise: sc2.profile()
    }
  });

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: {
      promise: request
        .get(process.env.UTOPIAN_API + 'logout')
        .set({ session: Cookie.get('session') })
        .then(() => {
          Cookie.remove('session');
          window.location.href = 'https://join.utopian.io';
        })
    }
  });
};

export const updateAuthUser = username => dispatch =>
  dispatch({
    type: UPDATE_AUTH_USER.ACTION,
    payload: {
      promise: getAccount(username),
    },
  });

export const getUpdatedSCUserMetadata = () => (dispatch, getState) =>
  dispatch({
    type: UPDATE_SC2_USER_METADATA.ACTION,
    payload: {
      promise: sc2.profile(),
    },
  });

export const busyLogin = () => (dispatch, getState) => {
  const accessToken = Cookie.get('session');
  const state = getState();

  if (!getIsAuthenticated(state)) {
    return dispatch({ type: BUSY_LOGIN.ERROR });
  }

  const targetUsername = getAuthenticatedUserName(state);

  return dispatch({
    type: BUSY_LOGIN.ACTION,
    meta: targetUsername,
    payload: {
      promise: busyAPI.sendAsync('login', [accessToken]),
    },
  });
};
