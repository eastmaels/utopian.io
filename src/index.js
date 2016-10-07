import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import {
  useHistoryRestoreScroll,
  useRouterRestoreScroll
} from 'react-router-restore-scroll';

import api from './steemAPI';
import routes from './routes';
import store from './store';
import {isSmall} from './lib/responsive';

const createHistory = useHistoryRestoreScroll(() => browserHistory);

browserHistory.listen(() => {
  if (isSmall()) {
    store.dispatch({
      type: 'HIDE_SIDEBAR',
    });
  }
});

const routerRender = applyRouterMiddleware(
  useRouterRestoreScroll()
);

// load the stylesheet
require('./styles/base.sass');

window.steemAPI = api;

ReactDOM.render(
  <Provider store={store}>
    <Router
      routes={routes}
      history={createHistory()}
      render={routerRender}
    />
  </Provider>,
  document.getElementById('app')
);
