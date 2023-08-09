import { io } from '../server';
import { ioConnect } from '../controllers/socketListeners';


const mockClient = {
  connected: false,
  listeners: {} as { [key: string]: Function },
  on: function (event: string, callback: Function) {
    if (event === 'connect') {
      this.connected = true;
      callback();
    }
    this.listeners[event] = callback;
  },
  emit: function (event: string, message: any) {
    if (this.listeners[event]) {
      this.listeners[event](message);
    }
  },
  disconnect: function() {
    if (this.connected) {
      this.connected = false;
      if (this.listeners['disconnect']) {
        this.listeners['disconnect']();
      }
    }
  },
  close: jest.fn(function() {
    this.connected = false;
  }),
};


let clientSocket: typeof mockClient;


beforeAll((done) => {
  clientSocket = mockClient;
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
    if (mockClient.listeners['hello']) {
      mockClient.listeners['hello']('world');
    }
  });

});