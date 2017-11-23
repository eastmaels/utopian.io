import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';
import * as querystring from 'querystring';

export const getProjectsRequest = q => ({
  [CALL_API]: {
    types: [ Actions.GET_PROJECTS_REQUEST, Actions.GET_PROJECTS_SUCCESS, Actions.GET_PROJECTS_FAILURE ],
    endpoint: `https://api.github.com/search/repositories?${querystring.encode(q)}+fork:true&sort=stars&order=desc`,
    //endpoint: `https://api.github.com/search/repositories?${querystring.encode(q)}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {fork:true},
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

export const getGithubOrgProjectsRequest = (account, loggedUser, accessToken) => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_ORG_PROJECTS_REQUEST, Actions.GET_GITHUB_ORG_PROJECTS_SUCCESS, Actions.GET_GITHUB_ORG_PROJECTS_FAILURE ],
    endpoint: `https://api.github.com/user/orgs?access_token=${accessToken}`,
    schema: null,
    method: 'GET',
    headers: {
      'Accept': 'token 0cdbd088a048b51fc2ab999e5b399c3f225af878',
      'Content-Type': 'application/vnd.github.v3.raw+json',
    },
    payload: {},
    additionalParams: {
      loggedUser,
    },
    absolute: true
  }
});

export const getGithubOrgProjectsRequestInternal = (account, loggedUser) => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_ORG_PROJECTS_REQUEST_INTERNAL, Actions.GET_GITHUB_ORG_PROJECTS_SUCCESS_INTERNAL, Actions.GET_GITHUB_ORG_PROJECTS_FAILURE_INTERNAL ],
    endpoint: `https://api.github.com/orgs/${account}/repos`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {
      loggedUser,
      state: "all"
    },
    absolute: true
  }
});


export const getGithubProjects = (account, loggedUser = false) => dispatch => dispatch(getGithubProjectsRequest(account, loggedUser));
export const getGithubOrgProjects = (account, loggedUser = false, accessToken = "") => dispatch => dispatch(getGithubOrgProjectsRequest(account, loggedUser, accessToken));
export const getGithubOrgProjectsInternal = (account, loggedUser = false) => dispatch => dispatch(getGithubOrgProjectsRequestInternal(account, loggedUser));
