require('../server.babel'); // babel registration (runtime transpilation for node)

import express from 'express';
// import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as actions from './actions/index';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import cookieSession from 'cookie-session';

const pretty = new PrettyError();
const app = express();

const server = new http.Server(app);

const io = new SocketIo(server);
io.path('/ws');

app.use(cookieSession({
  name: 'session',
  secret: 'session secret'
}))
// app.use(session({
//   secret: '---',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { maxAge: 1000 * 60 * 60 * 24 }
// }));
app.use(bodyParser.json());


app.use((req, res) => {

  req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 
  const matcher = req.url.split('?')[0].split('/').slice(1);

  let action = false;
  let params = null;
  let apiActions = actions;
  let sliceIndex = 0;

  try {
    for (const actionName of matcher) {

      if (apiActions[actionName]) {
        action = apiActions[actionName];
      }

      if (typeof action === 'function') {
        params = matcher.slice(++sliceIndex);
        break;
      }
      apiActions = action;
      ++sliceIndex;
    }
    if (action && typeof action === 'function') {
      action(req, params)
        .then((result) => {
          res.json(result);
        }, (reason) => {
          if (reason && reason.redirect) {
            res.redirect(reason.redirect);
          } else {
            console.error('API ERROR:', pretty.render(reason));
            res.status(reason.status || 500).json(reason);
          }
        });
    } else {
      res.status(404).end('NOT FOUND');
    }
  } catch (err) {
    console.log(err);
  }

});


const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> API is running on port %s', config.apiPort);
    console.info('==> Send requests to http://localhost:%s', config.apiPort);
  });

  io.on('connection', (socket) => {
    // socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);

} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
