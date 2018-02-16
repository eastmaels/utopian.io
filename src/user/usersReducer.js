import * as actions from './usersActions';

const initialState = {
  users: {},
};

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ACCOUNT.START:
      return {
        ...state,
        users: {
          ...state.users,
          [action.meta.username]: {
            ...state[action.meta.username],
            fetching: true,
            loaded: false,
            failed: false,
          },
        },
      };
    case actions.GET_ACCOUNT.SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          [action.meta.username]: {
            ...state[action.meta.username],
            ...action.payload,
            fetching: false,
            loaded: true,
            failed: false,
          },
        },
      };
    case actions.GET_ACCOUNT.ERROR:
      return {
        ...state,
        users: {
          ...state.users,
          [action.meta.username]: {
            ...state[action.meta.username],
            fetching: false,
            loaded: false,
            failed: true,
          },
        },
      };
    case actions.GET_FOLLOWING_COUNT_START:
      return {
        ...state,
        [action.meta.username]: {
          ...state[action.meta.username],
          isFetching: true,
        },
      };
    case actions.GET_FOLLOWING_COUNT_SUCCESS: {
      return {
        ...state,
        [action.meta.username]: {
          ...state[action.meta.username],
          isFetching: false,
          ...action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export const getUser = (state, username) => state[username] || {};
export const getIsUserFetching = (state, username) => getUser(state, username).fetching || false;
export const getIsUserLoaded = (state, username) => getUser(state, username).loaded || false;
export const getIsUserFailed = (state, username) => getUser(state, username).failed || false;
