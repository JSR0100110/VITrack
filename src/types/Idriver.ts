import { Point } from 'geojson';

export enum DriverAssociateStatus {
  available = 'available', // ready to accept new passenger
  dropping = 'dropping', // transporting
  off = 'off', // on leave
}

export default interface IDriverAssociate {
  email: string;
  name: string;
  status: DriverAssociateStatus;
  currentLocation: Point;
}
