import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const createGithubUserRequest = (account, code, state, scopeVersion = 1) => ({
  [CALL_API]: {
    types: [ Actions.CREATE_GITHUB_USER_REQUEST, Actions.CREATE_GITHUB_USER_SUCCESS, Actions.CREATE_GITHUB_USER_FAILURE ],
    endpoint: `users`,
    schema: null,
    method: 'POST',
    payload: {
      account,
      code,
      state,
      scopeVersion
    },
    additionalParams: {},
    absolute: false
  }
});

export const createGithubUser = (account, code, state) => dispatch => dispatch(createGithubUserRequest(account, code, state));

export const getUserRequest = (account) => ({
  [CALL_API]: {
    types: [ Actions.GET_USER_REQUEST, Actions.GET_USER_SUCCESS, Actions.GET_USER_FAILURE ],
    endpoint: `users/${account}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: false
  }
});

export const getUser = (account) => dispatch => dispatch(getUserRequest(account));


