const mongoose = require('mongoose');
const { MONGO_URI } = require('../utils/environment');

const connect = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('error', () => (
    console.error.bind(console, 'MongoDB connection error:')
  ));
};

module.exports = {
  connect,
};
