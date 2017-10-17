import * as Actions from '../actions/constants';
import * as R from 'ramda';

const sponsors = (state = [], action) => {
  switch (action.type) {
    case Actions.GET_SPONSORS_SUCCESS: {
      const sponsors = action.response.results;
      return sponsors;
    }
    default: {
      return state;
    }
  }
};

export default sponsors;
