import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const getModeratorsRequest = () => ({
    [CALL_API]: {
        types: [ Actions.GET_MODERATORS_REQUEST, Actions.GET_MODERATORS_SUCCESS, Actions.GET_MODERATORS_FAILURE ],
        endpoint: `moderators`,
        schema: null,
        method: 'GET',
        payload: {},
        additionalParams: {},
        absolute: false
    }
});

export const getModerators = () => dispatch => dispatch(getModeratorsRequest());
