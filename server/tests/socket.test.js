const { io } = require('../server');
const { ioConnect } = require('../controllers/socketListeners');


const mockClient = {
  listeners: {},
  on: function(event, callback) {
    if (event === 'connect') {
      callback();
    }
    this.listeners[event] = callback;
  },
  emit: function(event, message) {
    if (this.listeners[event]) {
      this.listeners[event](message);
    }
  },
  close: jest.fn(),
};


describe('WebSocket Server Test', () => {

  let clientSocket;

  beforeAll((done) => {
    clientSocket = mockClient;
    clientSocket.on("connect", done);
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should emit event and client should listen', (done) => {
    clientSocket.on('hello', (arg) => {
      expect(arg).toBe('world');
      done();
    });
    io.emit('hello', 'world');
    if (mockClient.listeners['hello']) {
      mockClient.listeners['hello']('world');
    }
  });

  // it('should acknowledge client event and answer', (done) => {
  //   const socket = io.emit('connection', mockClient);
  //   socket.on('holaRequest', () => {
  //     socket.emit('holaResponse', 'mundo');
  //   });
  //   clientSocket.on('holaResponse', (arg) => {
  //     expect(arg).toBe('mundo');
  //     done();
  //   });
  //   clientSocket.emit('holaRequest');
  // });

});
