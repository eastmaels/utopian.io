import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const createContributionRequest = (author, permlink) => ({
  [CALL_API]: {
    types: [ Actions.CREATE_CONTRIBUTION_REQUEST, Actions.CREATE_CONTRIBUTION_SUCCESS, Actions.CREATE_CONTRIBUTION_FAILURE ],
    endpoint: `posts`,
    schema: null,
    method: 'POST',
    payload: {
      author,
      permlink,
    },
    additionalParams: {},
    absolute: false
  }
});

export const createContribution = (author, permlink) => dispatch => dispatch(createContributionRequest(author, permlink));

export const updateContributionRequest = (author, permlink) => ({
  [CALL_API]: {
    types: [ Actions.UPDATE_CONTRIBUTION_REQUEST, Actions.UPDATE_CONTRIBUTION_SUCCESS, Actions.UPDATE_CONTRIBUTION_FAILURE ],
    endpoint: `posts/${author}/${permlink}`,
    schema: null,
    method: 'PUT',
    payload: {
      author,
      permlink,
    },
    additionalParams: {},
    absolute: false
  }
});

export const updateContribution = (author, permlink) => dispatch => dispatch(updateContributionRequest(author, permlink));

export const getContributionRequest = (author, permlink) => ({
  [CALL_API]: {
    types: [ Actions.GET_CONTRIBUTION_REQUEST, Actions.GET_CONTRIBUTION_SUCCESS, Actions.GET_CONTRIBUTION_FAILURE ],
    endpoint: `posts/${author}/${permlink}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: false
  }
});

export const getContribution = (author, permlink) => dispatch => dispatch(getContributionRequest(author, permlink));

export const moderatorActionRequest = (author, permlink, moderator, status) => ({
  [CALL_API]: {
    types: [ Actions.MODERATOR_ACTION_REQUEST, Actions.MODERATOR_ACTION_SUCCESS, Actions.MODERATOR_ACTION_FAILURE ],
    endpoint: `posts/${author}/${permlink}`,
    schema: null,
    method: 'PUT',
    payload: {
      author,
      permlink,
      moderator,
      reviewed: status === 'reviewed' ,
      flagged: status === 'flagged',
      pending: status === 'pending',
    },
    additionalParams: {},
    absolute: false
  }
});

export const moderatorAction = (author, permlink, moderator, status) => dispatch => dispatch(moderatorActionRequest(author, permlink, moderator, status));

export const setContribution = (contribution) => ({
  type: Actions.SET_CONTRIBUTION,
  payload: contribution
});

