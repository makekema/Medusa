import request from 'supertest';
import { io, app } from '../server';
import http from 'http';


import dotenv from 'dotenv';
dotenv.config();
const testPort: string = process.env.TEST_PORT!;


let httpServer: http.Server;


beforeAll((done) => {
  httpServer = app.listen(testPort, () => {
    console.log(`Test server is running on ${testPort}`);
    done();
  });
});

afterAll((done) => {
  httpServer.close(() => {
    console.log('Test server stopped');
    io.close();
    done();
  });
});


describe('Server', () => {
  it('should return 404, when accessing an unknown endpoint', async () => {
    const response = await request(app).get('/unknown');
    expect(response.statusCode).toBe(404);
  });
});

describe('Router, chatrooms', () => {
  
})