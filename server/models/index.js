import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

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

export { mongoose };
