import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';
import * as querystring from 'querystring';

export const getProjectsRequest = q => ({
  [CALL_API]: {
    types: [ Actions.GET_PROJECTS_REQUEST, Actions.GET_PROJECTS_SUCCESS, Actions.GET_PROJECTS_FAILURE ],
    //endpoint: `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc`,
    endpoint: `https://api.github.com/search/repositories?${querystring.encode(q)}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: true
  }
});

export const getProjects = (q) => dispatch => dispatch(getProjectsRequest(q));

export const setProjects = (projects) => ({
  type: Actions.SET_PROJECTS,
  payload: projects
});

export const getGithubProjectsRequest = (account, loggedUser) => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_PROJECTS_REQUEST, Actions.GET_GITHUB_PROJECTS_SUCCESS, Actions.GET_GITHUB_PROJECTS_FAILURE ],
    endpoint: `users/${account}/projects`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {
      loggedUser,
    },
    absolute: false
  }
});

export const getGithubProjects = (account, loggedUser = false) => dispatch => dispatch(getGithubProjectsRequest(account, loggedUser));
