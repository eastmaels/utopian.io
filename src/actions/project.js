import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

export const getGithubRepoRequest = repoId => ({
  [CALL_API]: {
    types: [ Actions.GET_GITHUB_REPO_REQUEST, Actions.GET_GITHUB_REPO_SUCCESS, Actions.GET_GITHUB_REPO_FAILURE ],
    endpoint: `https://api.github.com/repositories/${repoId}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: true
  }
});

export const getGithubRepo = repoId => dispatch => dispatch(getGithubRepoRequest(repoId));

export const createProjectAccountRequest = (externalId, projectName, platform, owner) => ({
  [CALL_API]: {
    types: [ Actions.CREATE_PROJECT_ACCOUNT_REQUEST, Actions.CREATE_PROJECT_ACCOUNT_SUCCESS, Actions.CREATE_PROJECT_ACCOUNT_FAILURE ],
    endpoint: `projects`,
    schema: null,
    method: 'POST',
    payload: {
      owner,
      platform,
      project_name: projectName,
      external_id: externalId
    },
    additionalParams: {},
    absolute: true
  }
});

export const createProjectAccount = (externalId, projectName, platform, owner) => dispatch => dispatch(createProjectAccountRequest(externalId, projectName, platform, owner));


export const getProjectRequest = (platform, externalId) => ({
  [CALL_API]: {
    types: [ Actions.GET_PROJECT_REQUEST, Actions.GET_PROJECT_SUCCESS, Actions.GET_PROJECT_FAILURE ],
    endpoint: `projects/${platform}/${externalId}`,
    schema: null,
    method: 'GET',
    payload: {},
    additionalParams: {},
    absolute: true
  }
});

export const getProject = (platform, externalId) => dispatch => dispatch(getProjectRequest(platform, externalId));

export const setGithubRepo = (repo) => ({
  type: Actions.SET_GITHUB_REPO,
  payload: repo
});
