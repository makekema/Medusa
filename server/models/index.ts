import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';


dotenv.config();

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


async function connectToDatabase () {
  return await mongoose.connect(connectionString, options)
    .then(() => {
      console.log('database connected');
    })
    .catch((error: Error) => {
      console.error('MongoDB connection error:', error);
      throw error;
    });
};

// Check if the environment is not 'test', then connect to the database
if (process.env.NODE_ENV !== 'test') {
  connectToDatabase();
}


export { mongoose, connectToDatabase };
