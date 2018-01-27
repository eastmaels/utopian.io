import { createAsyncActionType } from '../helpers/stateHelpers';
import { getAccountWithFollowingCount as getAccountWithFollowingCountAPI } from '../helpers/apiHelpers';

export const GET_ACCOUNT = createAsyncActionType('@users/GET_ACCOUNT');
export const GET_FOLLOWING_COUNT = '@users/GET_FOLLOWING_COUNT';
export const GET_FOLLOWING_COUNT_START = '@users/GET_FOLLOWING_COUNT_START';
export const GET_FOLLOWING_COUNT_SUCCESS = '@users/GET_FOLLOWING_COUNT_SUCCESS';
export const GET_FOLLOWING_COUNT_ERROR = '@users/GET_FOLLOWING_COUNT_ERROR';

export const getAccount = name => dispatch =>
  dispatch({
    type: GET_ACCOUNT.ACTION,
    payload: getAccountWithFollowingCountAPI(name),
    meta: { username: name },
  }).catch(() => {});

export const getAccountWithFollowingCount = ({ name }) => dispatch =>
  dispatch({
    type: GET_FOLLOWING_COUNT,
    payload: getAccountWithFollowingCountAPI(name),
    meta: { username: name },
  });
