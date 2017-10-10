import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';
import * as querystring from 'querystring';

export const getContributionsRequest = (limit, skip, query) => ({
    [CALL_API]: {
        types: [ Actions.GET_CONTRIBUTIONS_REQUEST, Actions.GET_CONTRIBUTIONS_SUCCESS, Actions.GET_CONTRIBUTIONS_FAILURE ],
        endpoint: `posts/?limit=${limit}&skip=${skip}&${query}`,
        schema: null,
        method: 'GET',
        payload: {},
        additionalParams: {},
        absolute: false
    }
});

export const getContributions = (limit, skip, query) => dispatch => dispatch(getContributionsRequest(limit, skip, query));

export const createContributionRequest = contributionData => ({
  [CALL_API]: {
    types: [ Actions.CREATE_CONTRIBUTION_REQUEST, Actions.CREATE_CONTRIBUTION_SUCCESS, Actions.CREATE_CONTRIBUTION_FAILURE ],
    endpoint: `posts`,
    schema: null,
    method: 'POST',
    payload: contributionData,
    additionalParams: {},
    absolute: false
  }
});

export const createContribution = contributionData => dispatch => dispatch(createContributionRequest(contributionData));

export const updateContributionRequest = contributionData => ({
  [CALL_API]: {
    types: [ Actions.UPDATE_CONTRIBUTION_REQUEST, Actions.UPDATE_CONTRIBUTION_SUCCESS, Actions.UPDATE_CONTRIBUTION_FAILURE ],
    endpoint: `posts/${contributionData.permlink}`,
    schema: null,
    method: 'PUT',
    payload: contributionData,
    additionalParams: {},
    absolute: false
  }
});

export const updateContribution = contributionData => dispatch => dispatch(updateContributionRequest(contributionData));

export const getContributionRequest = projectId => ({
  [CALL_API]: {
    types: [ Actions.GET_CONTRIBUTION_REQUEST, Actions.GET_CONTRIBUTION_SUCCESS, Actions.GET_CONTRIBUTION_FAILURE ],
    endpoint: `https://api.github.com/repositories/${projectId}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: false
  }
});

export const getContribution = projectId => dispatch => dispatch(getContributionRequest(projectId));

export const setContribution = (contribution) => ({
  type: Actions.SET_CONTRIBUTION,
  payload: contribution
});

export const setContributions = (contributions) => ({
  type: Actions.SET_CONTRIBUTIONS,
  payload: contributions
});
