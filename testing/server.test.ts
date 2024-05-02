/*import { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import ioClient from 'socket.io-client';
import { AddressInfo } from 'net';
import app from './app'; // Your Express app
import server from './server'; // Your HTTP server with socket.io

let httpServer: Server;
let ioServer: SocketIOServer;
let socket: Socket;

beforeAll((done) => {
  httpServer = server.listen(() => {
    const port = (httpServer.address() as AddressInfo).port;
    socket = ioClient.connect(`http://localhost:${port}`, {
      reconnectionDelay: 0,
      forceNew: true,
    });
    done();
  });
});

afterAll(() => {
  socket.disconnect();
  httpServer.close();
});

describe('Socket Connection', () => {
  it('should connect to the server', (done) => {
    socket.on('connect', () => {
      expect(socket.connected).toBe(true);
      done();
    });
  });

  it('should receive a welcome message', (done) => {
    socket.on('welcome', (message: string) => {
      expect(message).toBe('Welcome to the server!');
      done();
    });
  });
}); */
