const dotenv = require('dotenv');

dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI,
  ENVIRONMENT: process.env.ENVIRONMENT,
};

module.exports = config;
