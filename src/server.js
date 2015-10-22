/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';

import { RoutingContext, match } from 'react-router';
import ProviderContext from './lib/ProviderContext';
import routes from './routes';
import { createStore,
         combineReducers,
         applyMiddleware } from 'redux';
import * as reducers from './reducers';
import createLocation from 'history/lib/createLocation';
import promiseMiddleware from './lib/promiseMiddleware';

import Html from './components/Html';
// import TestBS from './components/TestBS';


const server = global.server = express();

server.set('port', (process.env.PORT || 5000));
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
// server.use('/api/content', require('./api/content'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    const location = createLocation(req.url);
    const reducer  = combineReducers(reducers);
    const store    = applyMiddleware(promiseMiddleware)(createStore)(reducer);
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      data.body = ReactDOM.renderToString(
        <ProviderContext store={store} context={context}>
          <RoutingContext {...renderProps} />
        </ProviderContext>
      );
      data.css = css.join('');
      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode).send('<!doctype html>\n' + html);
    });
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------

server.listen(server.get('port'), () => {
  /* eslint-disable no-console */
  console.log('The server is running at http://localhost:' + server.get('port'));
  if (process.send) {
    process.send('online');
  }
});
