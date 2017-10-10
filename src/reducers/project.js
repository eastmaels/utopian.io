import * as Actions from '../actions/constants';

const project = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_PROJECT_SUCCESS: {
      const project = action.response;
      return project;
    }
    case Actions.SET_PROJECT: {
      const project = action.payload;
      return project;
    }
    default: {
      return state;
    }
  }
};

export default project;
