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

export const moderatorActionRequest = (
      author,
      permlink,
      moderator,
      status,
      type,
      repository,
      tags,
      staff_pick,
    ) => ({
      [CALL_API]: {
        types: [ Actions.MODERATOR_ACTION_REQUEST, Actions.MODERATOR_ACTION_SUCCESS, Actions.MODERATOR_ACTION_FAILURE ],
        endpoint: `posts/${author}/${permlink}`,
        schema: null,
        method: 'PUT',
        payload: {
          author,
          permlink,
          moderator,
          reviewed: status === 'reviewed',
          flagged: status === 'flagged',
          pending: status === 'pending',
          type: type,
          repository: repository,
          tags: tags,
        },
        additionalParams: {},
        absolute: false
      }
    });

export const moderatorAction = (
      author,
      permlink,
      moderator,
      status,
      type,
      repository,
      tags,
    ) => dispatch => dispatch(
        moderatorActionRequest(
            author,
            permlink,
            moderator,
            status,
            type,
            repository,
            tags,
        )
    );

export const staffPickRequest = (
  author,
  permlink,
  moderator,
) => ({
  [CALL_API]: {
    types: [ Actions.MODERATOR_ACTION_REQUEST, Actions.MODERATOR_ACTION_SUCCESS, Actions.MODERATOR_ACTION_FAILURE ],
    endpoint: `posts/${author}/${permlink}`,
    payload: {
      author,
      permlink,
      moderator,
      staff_pick: true,
    },
    method: 'PUT',
    additionalParams: {},
    absolute: false
  }
});

export const staffPick = (
  author,
  permlink,
  moderator,
) => dispatch => dispatch(
  staffPickRequest(
    author,
    permlink,
    moderator,
  )
);

export const scoreContributionRequest = (
  author,
  permlink,
  user,
  owner,
  questions = [],
) => ({
  [CALL_API]: {
    types: [ Actions.MODERATOR_ACTION_REQUEST, Actions.MODERATOR_ACTION_SUCCESS, Actions.MODERATOR_ACTION_FAILURE ],
    endpoint: `posts/${author}/${permlink}`,
    schema: null,
    method: 'PUT',
    payload: {
      author,
      permlink,
      user,
      owner,
      questions: questions,
    },
    additionalParams: {},
    absolute: false
  }
});

export const scoreContribution = (
  author,
  permlink,
  user,
  owner,
  questions = [],
) => dispatch => dispatch(
  scoreContributionRequest(
    author,
    permlink,
    user,
    owner,
    questions,
  )
);

export const setContribution = (contribution) => ({
  type: Actions.SET_CONTRIBUTION,
  payload: contribution
});

