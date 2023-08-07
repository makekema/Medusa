import mongoose from 'mongoose';


import dotenv from 'dotenv';
dotenv.config();
const connectionString: string = process.env.DB_CONNECTION_STRING!;


afterAll(async () => {
  mongoose.disconnect();
});


describe('Test database connection', () => {
  it('should establish a connection to the MongoDB database', (done) => {
    mongoose.connect(connectionString);
    mongoose.connection.on('connected', () => {
      expect(mongoose.connection.readyState).toBe(1);
      done();
    });
    mongoose.connection.on('error', (error) => {
      done(error);
    });
  });
});
