import * as Actions from '../actions/constants';

const loading = (state = false, action) => {
  switch (action.type) {
    case Actions.GET_CONTRIBUTIONS_REQUEST: {
      return Actions.GET_CONTRIBUTIONS_REQUEST;
    }
    case Actions.GET_CONTRIBUTION_REQUEST: {
      return Actions.GET_CONTRIBUTION_REQUEST;
    }
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
