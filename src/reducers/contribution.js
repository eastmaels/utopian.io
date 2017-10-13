import * as Actions from '../actions/constants';

const contribution = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_CONTRIBUTION_SUCCESS: {
      const contribution = action.response;
      return contribution;
    }
    case Actions.UPDATE_CONTRIBUTION_SUCCESS: {
      const contribution = action.response;
      const stateContribution = state;

      if (Object.keys(stateContribution).length && stateContribution.id === contribution.id) {
        return contribution;
      }
      return stateContribution;
    }
    case Actions.CREATE_CONTRIBUTION_SUCCESS: {
      const contribution = action.response;

      return contribution;
    }
    case Actions.SET_CONTRIBUTION: {
      const contribution = action.payload;
      return contribution;
    }
    default: {
      return state;
    }
  }
};

export default contribution;
