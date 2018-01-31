import * as Actions from '../actions/constants';

const repo = (state = {}, action) => {
  switch (action.type) {
    case Actions.GET_GITHUB_REPO_SUCCESS: {
      const repo = action.response;
      return repo;
    }
    case Actions.SET_GITHUB_REPO: {
      const repo = action.payload;
      return repo;
    }
    default: {
      return state;
    }
  }
};

export default repo;
