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
        additionalParams: {},
        absolute: false
    }
});

export const getContributions = query => dispatch => dispatch(getContributionsRequest(query));
