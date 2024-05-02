import { Server } from 'socket.io';
import { socketEvents } from '../constants';
import PassengerCollection from '../models/Parcels';

const watcher = async (io: Server) => {
  const collection = await PassengerCollection();
  const changeStream = collection.watch([], { fullDocument: 'updateLookup' });
  changeStream.on('change', (event) => {
    // @ts-ignore
    const fullDocument = event.fullDocument;
    if (event.operationType === 'insert') {
      // Broadcast Shipment Available Msg to Driver Associates
      io.emit(socketEvents.PASSENGER_CREATED, fullDocument);
    }
    if (event.operationType === 'update') {
      io.to(String(fullDocument._id)).emit(
        socketEvents.PASSENGER_UPDATED,
        fullDocument
      );
    }
  });
};

export default watcher;
