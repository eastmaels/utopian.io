import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';
import * as querystring from 'querystring';

export const getGithubReposRequest = q => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_REPOS_REQUEST, Actions.GET_GITHUB_REPOS_SUCCESS, Actions.GET_GITHUB_REPOS_FAILURE ],
    endpoint: `https://api.github.com/search/repositories?${querystring.encode(q)}+fork:true&sort=stars&order=desc`,
    //endpoint: `https://api.github.com/search/repositories?${querystring.encode(q)}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {fork:true},
    absolute: true
  }
});

export const getGithubRepos = (q) => dispatch => dispatch(getGithubReposRequest(q));

export const setGithubRepos = (repos) => ({
  type: Actions.SET_GITHUB_REPOS,
  payload: repos
});

export const getReposByGithub = (account, loggedUser) => ({
  [CALL_API]: {
    types: [ Actions.GET_USER_REPOS_GITHUB_REQUEST, Actions.GET_USER_REPOS_GITHUB_SUCCESS, Actions.GET_USER_REPOS_GITHUB_FAILURE ],
    endpoint: `users/${account}/repos`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {
      loggedUser,
    },
    absolute: false
  }
});

export const getProjectsByGithub = (account, loggedUser = false) => dispatch => dispatch(getProjectsByGithubRequest(account, loggedUser));
