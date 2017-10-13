import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const getProjectsRequest = q => ({
    [CALL_API]: {
        types: [ Actions.GET_PROJECTS_REQUEST, Actions.GET_PROJECTS_SUCCESS, Actions.GET_PROJECTS_FAILURE ],
        endpoint: `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`,
        schema: null,
        method: 'GET',
        payload: {},
        additionalParams: {},
        absolute: true
    }
});

export const getProjects = q => dispatch => dispatch(getProjectsRequest(q));
