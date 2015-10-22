import React     from 'react';
import { IndexRoute, Route } from 'react-router';
// import TestBS from './components/TestBS';
// import App from './components/App';

import { App, Home } from './components';

export default (
  <Route name="app" component={App} path="/">
    <IndexRoute component={Home} />
  </Route>
);
