import request from 'supertest';
import mongoose, { Document } from 'mongoose';
import { io, app } from '../server';
import { connectToDatabase } from '../models/index';
import { Chatroom } from '../models/ChatroomSchema';
import { mockChatRoom } from './mocks';


beforeAll((done) => {
  connectToDatabase()
    .then(() => {
      console.log('database connected');
      done();
    })
    .catch((error: Error) => {
      console.error('MongoDB connection error:', error);
      done(error);
    });
});

afterAll((done) => {
  mongoose.disconnect()
    .then(() => {
      console.log('database disconnected');
      io.close();
      done();
    })
    .catch((error) => {
      console.error('Failed to disconnect from database:', error);
      io.close();
      done(error);
    });
});


describe('Test server connection', () => {

  it('should return 404, when accessing an unknown endpoint', async () => {
    const response = await request(app).get('/unknown');
    expect(response.statusCode).toBe(404);
  });

  it('should return 200, when accessing /chatrooms endpoint', async () => {
    const response = await request(app).get('/chatrooms');
    expect(response.statusCode).toBe(200);
  })

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


describe('Test router endpoints', () => {

  it('should create a new chatroom', async () => {
    const chatroomName = 'Test Room';
    const response = await request(app)
      .post('/chatrooms')
      .send({ name: chatroomName })
      .expect(201);
    expect(response.body.name).toEqual(chatroomName);
  });

  it('should fetch all chatrooms', async () => {
    const response = await request(app)
      .get('/chatrooms')
      .expect(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

});


describe('Test chatroom model', () => {
  it('should create and save a chatroom successfully', async () => {

    const validChatroom = new Chatroom(mockChatRoom);
    let savedChatroom: Document;

    try {
      savedChatroom = await validChatroom.save();
    } catch (error) {
      throw new Error('cannot save chatroom');
    }

    expect(savedChatroom._id).toBeDefined();
    expect(savedChatroom.get('name')).toBe(mockChatRoom.name);
    expect(savedChatroom.get('users')).toBe(mockChatRoom.users);
    expect(savedChatroom.get('usernames')).toStrictEqual(mockChatRoom.usernames);
    expect(savedChatroom.get('creator')).toBe(mockChatRoom.creator);
  });

});