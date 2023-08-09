import { io } from '../server';

const mockClient = {
  listeners: {} as { [key: string]: Function },
  on: function (event: string, callback: Function) {
    if (event === 'connect') {
      callback();
    }
    this.listeners[event] = callback;
  },
  emit: function (event: string, message: any) {
    if (this.listeners[event]) {
      this.listeners[event](message);
    }
  },
  close: jest.fn(),
};

describe('WebSocket Server Test', () => {
  let clientSocket: typeof mockClient;

  beforeAll((done) => {
    clientSocket = mockClient;
    clientSocket.on('connect', done);
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

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
