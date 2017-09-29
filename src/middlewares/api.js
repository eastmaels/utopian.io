import { get, post } from 'superagent';
import { merge, path } from 'ramda';

export const CALL_API = 'CALL_API';
const API_ROOT = "/api/v1/";

const callApi = (endpoint, schema, method, payload, additionalParams, absolute?) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) && !absolute
          ? API_ROOT + endpoint : endpoint

  switch (method) {
    case 'GET':
      return get(fullUrl)
        .then(res => {
          return res.body
        });
    case 'POST':
      return post(fullUrl)
        .send(payload)
        .then(res => {
          return res.body
        });
    default:
      return null;
  }
}

export default store => next => action => {
  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { schema, types, method, payload, additionalParams, absolute } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }

  if (!method) {
    throw new Error('Specify the method.')
  }

  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be JSON object.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = merge(action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, schema, method, payload, additionalParams, absolute).then(
    response => next(actionWith({
      response,
      type: successType,
      payload,
      additionalParams,
      absolute
    })),
    error => {
      const errBody = path(['response', 'text'], error)
      const errResponse = errBody ? JSON.parse(errBody) : {}
      return next(actionWith({
        type: failureType,
        status: error.status,
        error: error.message || 'Something bad happened',
        code: errResponse.code,
        message: errResponse.message,
        errMessage: errResponse.errMessage
      }))
    }
  )
}
