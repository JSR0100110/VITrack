import { Point } from 'geojson';
import IUser from './IUser';
import IDriverAssociate from './Idriver';

export enum PassengerStatus {
  requested = 'requested',
  driverAssociateAssigned = 'driverAssociateAssigned',
  pickupLocationReached = 'pickupLocationReached',
  transporting = 'transporting',
  dropLocationReached = 'dropLocationReached',
  dropped = 'dropped',
  cancelled = 'cancelled',
}

export default interface IShipment {
  pickupLocation: Point;
  dropLocation: Point;
  userId: string | IUser;
  driverAssociateId?: string | IDriverAssociate;
  status: PassengerStatus;
}
