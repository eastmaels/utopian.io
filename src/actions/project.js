import { CALL_API } from '../middlewares/api';
import * as Actions from '../actions/constants';

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
