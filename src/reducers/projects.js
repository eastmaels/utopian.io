import * as Actions from '../actions/constants';

const projects = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_PROJECTS_SUCCESS: {
      const { items } = action.response;
      return items;
    }
    case Actions.SET_PROJECTS: {
      const projects = action.payload;
      return projects;
    }
    default: {
      return state;
    }
  }
};

export default projects;
