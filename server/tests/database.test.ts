import mongoose from 'mongoose';


import dotenv from 'dotenv';
dotenv.config();
const connectionString: string = process.env.DB_CONNECTION_STRING!;


beforeAll((done) => {
  mongoose.connect(connectionString)
    .then(() => {
      //console.log('database connected');
      done();
    })
    .catch((error: Error) => {
      //console.error('MongoDB connection error:', error);
      done(error);
    });
});

afterAll((done) => {
  mongoose.disconnect()
    .then(() => {
      //console.log('Database disconnected');
      done();
    })
    .catch((error) => {
      //console.error('Failed to disconnect from database:', error);
      done(error);
    });
});


describe('Test database connection', () => {
  it('should establish a connection to the MongoDB database', (done) => {
    if (mongoose.connection.readyState === 1) {
      expect(mongoose.connection.readyState).toBe(1);
      done();
    } else {
      mongoose.connection.on('connected', () => {
        expect(mongoose.connection.readyState).toBe(1);
        done();
      });
      mongoose.connection.on('error', (error) => {
        done(error);
      });
    }
  });
});

