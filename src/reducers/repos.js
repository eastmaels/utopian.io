import * as Actions from '../actions/constants';

const repos = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_GITHUB_REPOS_SUCCESS: {
      console.log(action)
      const { items } = action.response;
      return items;
    }
    case Actions.SET_GITHUB_REPOS: {
      const repos = action.payload;
      return repos;
    }
    default: {
      return state;
    }
  }
};

export default repos;
