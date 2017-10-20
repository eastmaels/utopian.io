import * as Actions from '../actions/constants';
import * as R from 'ramda';

const moderators = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_MODERATORS_SUCCESS: {
      const moderators = action.response.results;
      return moderators;
    }
    default: {
      return state;
    }
  }
};

export default moderators;
