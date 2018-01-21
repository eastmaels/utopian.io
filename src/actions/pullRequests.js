import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';


export const getPullRequestsRequest = (repository) => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_PR_REQUEST, Actions.GET_GITHUB_PR_SUCCESS, Actions.GET_GITHUB_PR_FAILURE ],
    endpoint: `https://api.github.com/repos/${repository}/pulls?state=closed`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: true
  }
});

export const getPullRequests = (repository) => dispatch => dispatch(getPullRequestsRequest(repository));
