import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const getSponsorsRequest = () => ({
    [CALL_API]: {
        types: [ Actions.GET_SPONSORS_REQUEST, Actions.GET_SPONSORS_SUCCESS, Actions.GET_SPONSORS_FAILURE ],
        endpoint: `sponsors`,
        schema: null,
        method: 'GET',
        payload: {},
        additionalParams: {},
        absolute: false
    }
});

export const getSponsors = () => dispatch => dispatch(getSponsorsRequest());
