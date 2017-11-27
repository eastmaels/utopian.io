import * as Actions from '../actions/constants';

const loading = (state = false, action) => {
  switch (action.type) {
    case Actions.CREATE_CONTRIBUTION_REQUEST: {
      return Actions.CREATE_CONTRIBUTION_REQUEST;
    }
    case Actions.GET_CONTRIBUTIONS_REQUEST: {
      return Actions.GET_CONTRIBUTIONS_REQUEST;
    }
    case Actions.GET_CONTRIBUTION_REQUEST: {
      return Actions.GET_CONTRIBUTION_REQUEST;
    }
    case Actions.GET_SPONSORS_REQUEST: {
      return Actions.GET_SPONSORS_REQUEST;
    }
    case Actions.GET_GITHUB_REPOS_REQUEST: {
      return Actions.GET_GITHUB_REPOS_REQUEST;
    }
    case Actions.VOTE_WITH_SPONSORS_REQUEST: {
      return Actions.VOTE_WITH_SPONSORS_REQUEST;
    }
    case Actions.VOTE_WITH_SPONSORS_SUCCESS:
    case Actions.VOTE_WITH_SPONSORS_FAILURE:
    case Actions.GET_GITHUB_REPOS_SUCCESS:
    case Actions.CREATE_SPONSOR_SUCCESS:
    case Actions.CREATE_CONTRIBUTION_SUCCESS:
    case Actions.GET_CONTRIBUTION_SUCCESS:
    case Actions.GET_CONTRIBUTIONS_SUCCESS: {
      return false;
    }
    default: {
      return state;
    }
  }
};

export default loading;
