import { io } from '../server';
import { ioConnect } from '../controllers/socketListeners';
import { ClientSocketType } from '../models/types';
import { createMockClientSocket } from './mockSocket';


let clientSocket: ClientSocketType;


beforeAll((done) => {
  clientSocket = createMockClientSocket('test_socket');
  ioConnect(io);
  clientSocket.on('connect', done);
});

afterAll(() => {
  io.close();
  clientSocket.close();
});


describe('WebSocket Server Test', () => {

  it('should emit event and client should listen', (done) => {
    clientSocket.on('hello', (arg: any) => {
      expect(arg).toBe('world');
      done();
    });
    io.emit('hello', 'world');
    if (clientSocket.listeners['hello']) {
      clientSocket.listeners['hello']('world');
    }
  });

});