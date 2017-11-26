const authCallback = require('./auth-callback');

const express = require('express');
const app = express();

app.get('/callback', authCallback);

const server = app.listen(3001, 'localhost', () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Auth server running at http://%s:%s/', host, port);
});
