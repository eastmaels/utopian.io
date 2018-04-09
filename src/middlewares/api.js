import { get, post, put } from 'superagent';
import { merge, path } from 'ramda';
import Cookie from 'js-cookie';

export const CALL_API = 'CALL_API';
const API_ROOT = process.env.UTOPIAN_API;

function processReq(req, headers) {
  req.set(headers);
  return req;
}

const callApi = (endpoint, schema, method, payload, additionalParams, absolute?) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) && !absolute
          ? API_ROOT + endpoint : endpoint;
  let session = undefined;
  if (fullUrl.indexOf(API_ROOT) !== -1) {
    session = Cookie.get('session');
  }

  const headers = absolute ? {} : {
      session,
      'x-api-key-id': 'kvo2x1982b',
      'x-api-key': 'c5pEsMpYZY896r7USzhWdapIY7o1GEpj3QCEQZSN',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

  switch (method) {
    case 'GET':
      return processReq(get(fullUrl), headers);
    case 'POST':
      return processReq(post(fullUrl).send(payload), headers);
    case 'PUT':
      return processReq(put(fullUrl).send(payload), headers);
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

  let apiCall = callApi(endpoint, schema, method, payload, additionalParams, absolute);
  let promise = apiCall.then(
		response => next(actionWith({
      response: response ? response.body : null,
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
	).catch(err => {
		if (err.status === 407 && session) {
		Cookie.remove('session');
		window.location.reload(true);
		}
	})
  
  return {
	  then: (resolve, reject) => {
      promise.then( resolve, reject );
      return apiCall;
	  },
	  catch: (reject) => {
      promise.catch(reject);
      return apiCall;
    },
	  abort: () => {
      apiCall.abort();
      return apiCall;
	  },
  }
}
