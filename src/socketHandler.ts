import { Server } from 'socket.io';
import { Point } from 'geojson';
import { socketEvents } from './constants';
import updateLocation from './services/drIvers/updateLocation';

interface IUpdateDALocation {
  email: string;
  location: Point;
}
interface ISubscribeToPassenger {
  passengerId: string;
}
interface ISubscribeToDA {
  driverAssociateId: string;
}
interface ILeaveRoom {
  roomId: string;
}

//defines the socketHandler function that takes server instance from socket.io
const socketHandler = (io: Server) => {
  io.on('connection', (socket: any) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });

    // UPDATE_DA_LOCATION : Sent by drivers when driving
    socket.on(
      socketEvents.UPDATE_DA_LOCATION,
      async (data: IUpdateDALocation) => {
        const { email, location } = data;
        await updateLocation(email, location);
      }
    );

    /**
     * Socket rooms are based on passenger Ids or driverIds
     * To listen to change streams user needs to subscribe to a passengerId or driverAssociateId
     */
    // SUBSCRIBE_TO_PASSENGER
    socket.on(
      socketEvents.SUBSCRIBE_TO_PASSENGER,
      (data: ISubscribeToPassenger) => {
        socket.join(data.passengerId);
      }
    );
    // SUBSCRIBE_TO_DA
    socket.on(socketEvents.SUBSCRIBE_TO_DA, (data: ISubscribeToDA) => {
      socket.join(data.driverAssociateId);
    });

    // LEAVE_ROOM
    socket.on(socketEvents.LEAVE_ROOM, (data: ILeaveRoom) => {
      socket.leave(data.roomId);
    });
  });
};
export default socketHandler;
