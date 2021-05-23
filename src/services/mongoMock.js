/* eslint-disable import/no-extraneous-dependencies */
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connect = async () => {
  mongoServer = new MongoMemoryServer();
  const MONGO_URI = await mongoServer.getUri();

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', () => (
    console.error.bind(console, 'MongoDB connection error:')
  ));
};

const disconnect = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

module.exports = {
  connect,
  disconnect,
};
