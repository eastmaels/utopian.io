import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const createGithubUserRequest = (account, code, state) => ({
  [CALL_API]: {
    types: [ Actions.CREATE_GITHUB_USER_REQUEST, Actions.CREATE_GITHUB_USER_SUCCESS, Actions.CREATE_GITHUB_USER_FAILURE ],
    endpoint: `users`,
    schema: null,
    method: 'POST',
    payload: {
      account,
      code,
      state
    },
    additionalParams: {},
    absolute: false
  }
});

export const createGithubUser = (account, code, state) => dispatch => dispatch(createGithubUserRequest(account, code, state));

