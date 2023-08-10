import { ioConnect } from '../controllers/socketListeners';
import { io, app, httpServer } from '../server';
import { Server } from 'socket.io';
// import { Socket } from 'socket.io';
import { createServer } from 'http';
// import("socket.io-client").then((io) => {
//   const Socket: typeof io.Socket = io.Socket;
// });
import { Message, ClientSocketType } from '../models/types';
import { mockMessage } from './mocks';
import { createMockClientSocket } from './mockSocket';


describe('ioConnect', () => {
  // let httpServer: any;
  let ioServer: Server;
  let clientSocket1: ClientSocketType;
  let clientSocket2: ClientSocketType;

  beforeAll((done) => {
    // httpServer = createServer();
    // ioServer = new Server(httpServer);
    // ioConnect(ioServer);
    // ioConnect(io);
    // const port = 3000;
    httpServer.listen(() => {
      const port = (httpServer.address() as any).port;
      clientSocket1 = createMockClientSocket('socket1');
      clientSocket2 = createMockClientSocket('socket2');
      clientSocket1.on('connect', () => {
        clientSocket2.on('connect', done);
      });
    });
  });

  afterAll(() => {
    // ioServer.close();
    io.close();
    httpServer.close();
    clientSocket1.close();
    clientSocket2.close();
  });

  it('should broadcast receive_message to all other sockets when send_message is received', (done) => {

    clientSocket2.on('receive_message', (message: Message) => {
      expect(message).toEqual(mockMessage);
      done();
    });

    clientSocket1.emit('send_message', mockMessage);
  });

  it('should not broadcast receive_message to the sender', (done) => {

    clientSocket1.on('receive_message', () => {
      fail('Sender should not receive the broadcasted message');
    });

    clientSocket2.emit('send_message', mockMessage);
    setTimeout(done, 100);
  });

});
