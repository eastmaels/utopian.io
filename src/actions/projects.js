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


export const getProjectRequest = projectId => ({
  [CALL_API]: {
    types: [ Actions.GET_PROJECT_REQUEST, Actions.GET_PROJECT_SUCCESS, Actions.GET_PROJECT_FAILURE ],
    endpoint: `https://api.github.com/repositories/${projectId}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: true
  }
});

export const getProject = projectId => dispatch => dispatch(getProjectRequest(projectId));

export const setProject = (project) => ({
  type: Actions.SET_PROJECT,
  payload: project
});

export const setProjects = (projects) => ({
  type: Actions.SET_PROJECTS,
  payload: projects
});

