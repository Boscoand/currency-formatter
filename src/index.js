const serverless = require('serverless-http');
const express = require('express');

const format = require('./api/components/format/routes');
const error = require('./api/utils/error');

const app = express();

app.use('/format', format);

app.use(() => {
  error.routeNotFound();
});

module.exports.handler = serverless(app);
