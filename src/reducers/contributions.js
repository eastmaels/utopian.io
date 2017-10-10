import * as Actions from '../actions/constants';

const contributions = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_CONTRIBUTIONS_SUCCESS: {
      const contributions = action.response.results;
      return [
        ...state,
        ...contributions
      ];
    }
    case Actions.SET_CONTRIBUTIONS: {
      const contributions = action.payload;
      return contributions;
    }
    default: {
      return state;
    }
  }
};

export default contributions;
