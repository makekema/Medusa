const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

const mongoose = require('mongoose');

const connectionString = process.env.DB_CONNECTION_STRING;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('database connected');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

  
  module.exports = mongoose;