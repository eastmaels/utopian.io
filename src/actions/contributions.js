import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';
import * as querystring from 'querystring';

export const getContributionsRequest = query => ({
    [CALL_API]: {
        types: [ Actions.GET_CONTRIBUTIONS_REQUEST, Actions.GET_CONTRIBUTIONS_SUCCESS, Actions.GET_CONTRIBUTIONS_FAILURE ],
        endpoint: `posts/?${querystring.encode(query)}`,
        schema: null,
        method: 'GET',
        payload: {},
        additionalParams: {
          reset: query.reset || false
        },
        absolute: false
    }
});

export const getContributions = query => dispatch => dispatch(getContributionsRequest(query));

export const getPostByIdRequest = (postId) => ({
    [CALL_API]: {
        types: [ Actions.GET_POSTBYID_REQUEST, Actions.GET_POSTBYID_SUCCESS, Actions.GET_POSTBYID_FAILURE ],
        endpoint: `posts/byid/${postId}`,
        schema: null,
        method: 'GET',
        payload: {
            postId: postId,
        },
        additionalParams: {
        },
        absolute: false
    }
});

export const getPostById = (postId) => dispatch => dispatch(getPostByIdRequest(postId));

// export const addPostPrefixRequest = (postId, uprefix) => ({
//     [CALL_API]: {
//       types: [ Actions.ADD_PREFIX_REQUEST, Actions.ADD_PREFIX_SUCCESS, Actions.ADD_PREFIX_FAILURE ],
//       endpoint: `posts/byid/${postId}`,
//       schema: null,
//       method: 'PUT',
//       payload: {
//         postId,
//         uprefix,
//       },
//       additionalParams: {},
//       absolute: false
//     }
//   });

//   export const addPostPrefix = (postId, uprefix = null) => dispatch => dispatch(addPostPrefixRequest(postId, uprefix));
