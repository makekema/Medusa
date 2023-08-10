import { io } from '../server';
import { ioConnect } from '../controllers/socketListeners';
import { mockClientSocket } from './mockSocket';


let clientSocket: typeof mockClientSocket;


beforeAll((done) => {
  clientSocket = mockClientSocket;
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
    if (mockClientSocket.listeners['hello']) {
      mockClientSocket.listeners['hello']('world');
    }
  });

});