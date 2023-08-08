// // import * as ioClient from 'socket.io-client';
// // import * as http from 'http';
// // import * as ioBack from 'socket.io';

// // let socket: SocketIOClient.Socket;
// // let httpServer: http.Server;
// // let httpServerAddr: string | http.AddressInfo | null;
// // let ioServer: SocketIO.Server;

// // /**
// //  * Setup WS & HTTP servers
// //  */
// // beforeAll((done) => {
// //   httpServer = http.createServer().listen();
// //   httpServerAddr = httpServer.address();
// //   ioServer = ioBack(httpServer);
// //   done();
// // });

// // /**
// //  * Cleanup WS & HTTP servers
// //  */
// // afterAll((done) => {
// //   ioServer.close();
// //   httpServer.close();
// //   done();
// // });

// // /**
// //  * Run before each test
// //  */
// // beforeEach((done) => {
// //   // Setup
// //   // Do not hardcode server port and address, square brackets are used for IPv6
// //   if (httpServerAddr && typeof httpServerAddr === 'object') {
// //     socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
// //       'reconnection delay': 0,
// //       'reopen delay': 0,
// //       'force new connection': true,
// //       transports: ['websocket'],
// //     });
// //     socket.on('connect', () => {
// //       done();
// //     });
// //   } else {
// //     // Handle the case where httpServerAddr is not in the expected format
// //     done(new Error('Server address not found'));
// //   }
// // });

// // /**
// //  * Run after each test
// //  */
// // afterEach((done) => {
// //   // Cleanup
// //   if (socket.connected) {
// //     socket.disconnect();
// //   }
// //   done();
// // });

// // import { Server as IOServer } from 'socket.io';

// // describe('basic socket.io example', () => {
// //   test('should communicate', (done) => {
// //     // once connected, emit Hello World
// //     ioServer.emit('echo', 'Hello World');
// //     socket.once('echo', (message: string) => {
// //       // Check that the message matches
// //       expect(message).toBe('Hello World');
// //       done();
// //     });
// //     ioServer.on('connection', (mySocket: IOServer.Socket) => {
// //       expect(mySocket).toBeDefined();
// //     });
// //   });

// //   test('should communicate with waiting for socket.io handshakes', (done) => {
// //     // Emit something from Client to Server
// //     socket.emit('example', 'some messages');
// //     // Use timeout to wait for socket.io server handshakes
// //     setTimeout(() => {
// //       // Put your server-side expect() here
// //       done();
// //     }, 50);
// //   });
// // });

// import { createServer, Server as HttpServer } from "http";
// import { Server as IOServer, Socket } from "socket.io";
// import Client from "socket.io-client";

// describe("my awesome project", () => {
//   let io: IOServer;
//   let serverSocket: Socket;
//   let clientSocket: Client;

//   beforeAll((done) => {
//     const httpServer: HttpServer = createServer();
//     io = new IOServer(httpServer);
//     httpServer.listen(() => {
//       const port: number = (httpServer.address() as any).port;
//       clientSocket = Client(`http://localhost:${port}`);
//       io.on("connection", (socket: Socket) => {
//         serverSocket = socket;
//       });
//       clientSocket.on("connect", done);
//     });
//   });

//   afterAll(() => {
//     io.close();
//     clientSocket.close();
//   });

//   test("should work", (done) => {
//     clientSocket.on("hello", (arg: string) => {
//       expect(arg).toBe("world");
//       done();
//     });
//     serverSocket.emit("hello", "world");
//   });

//   test("should work (with ack)", (done) => {
//     serverSocket.on("hi", (cb: (response: string) => void) => {
//       cb("hola");
//     });
//     clientSocket.emit("hi", (arg: string) => {
//       expect(arg).toBe("hola");
//       done();
//     });
//   });
// });
