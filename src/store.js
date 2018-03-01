import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { API } from './middlewares';
import { applyMiddleware, createStore, compose } from 'redux';
import { CALL_HISTORY_METHOD } from 'react-router-redux';
import api from './steemAPI';
import { history } from './routes';
import { mountResponsive } from './vendor/responsive';
import errorMiddleware from './errorMiddleware';
import reducers from './reducers';

let preloadedState;
if (process.env.IS_BROWSER) {
  /* eslint-disable no-underscore-dangle */
  preloadedState = window.__PRELOADED_STATE__;
  delete window.__PRELOADED_STATE__;
  /* eslint-enable no-underscore-dangle */
}

if (process.env.IS_BROWSER && process.env.NODE_ENV !== 'production') {
  window.steemAPI = api;
}

const middleware = [
  errorMiddleware,
  promiseMiddleware({
    promiseTypeSuffixes: [
      'START',
      'SUCCESS',
      'ERROR',
    ],
  }),
  API,
  thunk.withExtraArgument({
    steemAPI: api,
  }),
  () => next => action => {
	  if (action.type !== CALL_HISTORY_METHOD) {
     return next(action);
    }

    const { payload: { method, args } } = action;
    history[method](...args);
  },
  //routerMiddleware(history),
];

let enhancer;
if (process.env.IS_BROWSER) {
  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(...middleware));
} else {
  enhancer = compose(applyMiddleware(...middleware));
}

const getStore = () => {
  const store = createStore(
    reducers,
    preloadedState,
    enhancer,
  );
  mountResponsive(store);
  return store;
};

export default getStore;
