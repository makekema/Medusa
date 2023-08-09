import request from 'supertest';
import mongoose, { Document } from 'mongoose';
import { io, app } from '../server';
import { connectToDatabase } from '../models/index';
import { Chatroom } from '../models/ChatroomSchema';
import { mockChatRoom } from './mocks';
import { db } from '../models/chatroomModel';


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
      if (response.body._id) {
        await Chatroom.findByIdAndDelete(response.body._id);
      }
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
    let savedChatroom: Document | null = null;
  
    try {
      const validChatroom = new Chatroom(mockChatRoom);
      savedChatroom = await validChatroom.save();
  
      expect(savedChatroom._id).toBeDefined();
      expect(savedChatroom.get('name')).toBe(mockChatRoom.name);
      expect(savedChatroom.get('users')).toBe(mockChatRoom.users);
      expect(savedChatroom.get('usernames')).toStrictEqual(mockChatRoom.usernames);
      expect(savedChatroom.get('creator')).toBe(mockChatRoom.creator);
    } finally {
      if (savedChatroom?._id) {
        await Chatroom.findByIdAndDelete(savedChatroom._id);
      }
    }
  });
});
  


// describe('Test database functions', () => {

//   it('should create a chatroom', async () => {
//     try {
//       await db.createChatroom(mockChatRoom);
//       const createdRoom = await Chatroom.findOne({ name: 'testRoom' });
//       if (createdRoom !== null) {
//         console.log(createdRoom._id);}
//       expect(createdRoom).not.toBeNull();    
//     } catch (err) {
//       throw err;
//     }
//   });

//   it('should find a chatroom by name', async () => {
//     try {
//       const foundRoom = await db.findChatroom('testRoom');
//       // if (foundRoom !== null) {
//       //   console.log((foundRoom as any)._id);}
//       expect(foundRoom).toMatchObject(mockChatRoom);
//     } catch (err) {
//       throw err;
//     }
//   });

  // it('should update a chatroom', async () => {
  //   try {
  //     await db.updateChatroom(mockChatRoom.name, { users: 4 });
  //     const updatedRoom = await Chatroom.findOne({ name: 'testRoom' });
  //     expect(updatedRoom?.users).toBe(4);
  //   } catch (err) {
  //     throw err;
  //   }
  // });

  // it('should delete a chatroom by name', async () => {
  //   try {
  //     await db.deleteChatroom(mockChatRoom.name);
  //     const deletedRoom = await Chatroom.findOne({ name: 'testRoom' });
  //     expect(deletedRoom).toBeNull();
  //   } catch (err) {
  //     throw err;
  //   }
  // });

// });
