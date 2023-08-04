import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import path from 'path';
import mongoose, { ConnectOptions } from 'mongoose';


const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const connectionString: string = process.env.DB_CONNECTION_STRING!;


const options: ConnectOptions = {

// the following two lines help to avoid
// a write error related to Atlas
writeConcern: {
  w: 1
},
// writeConcern:
// "w: 1 means that MongoDB will acknowledge
// write operations after they have been written
// to the primary only.
// This is less safe than w: 'majority',
// but it might help you avoid the error if you are not able
// to configure your MongoDB Atlas cluster
// to support majority write concern."

};


mongoose.connect(connectionString, options)
  .then(() => {
    console.log('database connected');
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
  });


export { mongoose };
