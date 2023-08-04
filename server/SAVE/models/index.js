import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, {


  // the following two lines help to avoid
  // a write error related to Atlas
  writeConcern: {
    w: 1
  },
  // writeConcern:
  // "w: 1 means that MongoDB will acknowledge
  //write operations after they have been written
  //to the primary only.
  //This is less safe than w: 'majority',
  // but it might help you avoid the error if you are not able
  //to configure your MongoDB Atlas cluster
  // to support majority write concern."
  

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
