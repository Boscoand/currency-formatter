const serverless = require('serverless-http');
const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { connect } = require('./services/mongo');

const formats = require('./api/components/formats/routes');
const error = require('./utils/error');

global.ErrorHandler = error.ErrorHandler;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/formats', formats);

app.use(() => {
  error.routeNotFound();
});
app.use((err, req, res, next) => {
  error.handleError(err, res, next);
});

module.exports.handler = async (event, context) => {
  await connect();

  const handler = serverless(app);
  const result = await handler(event, context);

  return result;
};

module.exports.app = app;
