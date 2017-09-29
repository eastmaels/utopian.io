import { CALL_API } from '../middlewares/api';

export const GET_PROJECTS_REQUEST = '@projects/GET_PROJECTS_REQUEST';
export const GET_PROJECTS_SUCCESS = '@projects/GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_FAILURE = '@projects/GET_PROJECTS_FAILURE';

export const GET_PROJECT_REQUEST = '@projects/GET_PROJECT_REQUEST';
export const GET_PROJECT_SUCCESS = '@projects/GET_PROJECT_SUCCESS';
export const GET_PROJECT_FAILURE = '@projects/GET_PROJECT_FAILURE';

export const SET_PROJECT = '@projects/SET_PROJECT';
export const SET_PROJECTS = '@projects/SET_PROJECTS';

export const getProjectsRequest = q => ({
    [CALL_API]: {
        types: [ GET_PROJECTS_REQUEST, GET_PROJECTS_SUCCESS, GET_PROJECTS_FAILURE ],
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
    types: [ GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAILURE ],
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
  type: SET_PROJECT,
  payload: project
});

export const setProjects = (projects) => ({
  type: SET_PROJECTS,
  payload: projects
});

