import { Point } from 'geojson';
import { LatLng } from 'leaflet';

export interface AppRes {
  data: any;
  isError: boolean;
  errMsg?: string;
}

export enum PassengerStatus {
  requested = 'requested',
  driverAssociateAssigned = 'driverAssociateAssigned',
  pickupLocationReached = 'pickupLocationReached',
  transporting = 'transporting',
  dropLocationReached = 'dropLocationReached',
  dropped = 'dropped',
  cancelled = 'cancelled',
}
export interface IPassenger {
  _id: string;
  pickupLocation: Point;
  dropLocation: Point;
  userId: string;
  status: PassengerStatus;
  driverAssociateId?: string;
}
export interface PassengerRes extends AppRes {
  data: IPassenger;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  organization: string;
  roles: Array<string>;
}

export interface UserRes extends AppRes {
  data: IUser;
}

export interface TokenRes extends AppRes {
  data: { token: string };
}

export enum DashboardStatus {
  NO_PASSENGER = 'NO_PASSENGER',
  PASSENGER_INITIATED = 'PASSENGER_INITIATED',
  PICKUP_SELECTED = 'PICKUP_SELECTED',
  DROP_SELECTED = 'DROP_SELECTED',
  SEARCHING_ASSOCIATES = 'SEARCHING_ASSOCIATES',
  ASSOCIATE_ASSIGNED = 'ASSOCIATE_ASSIGNED',
  PICKUP_LOCATION_REACHED = 'PICKUP_LOCATION_REACHED',
  TRANSPORTING = 'TRANSPORTING',
  DROP_LOCATION_REACHED = 'DROP_LOCATION_REACHED',
  DROPPED = 'DROPPED',
  CANCELLED = 'CANCELLED',
}
export interface IInfo {
  title: string;
  msg: string;
}
export interface State {
  pickupLocation: LatLng;
  isPickupDraggable: boolean;
  isShowPickupMarker: boolean;
  dropLocation: LatLng;
  isDropDraggable: boolean;
  isShowDropMarker: boolean;
  driverLocation: LatLng | null;
  dashboardStatus: DashboardStatus;
}
export interface IAction {
  type: string;
  payload?: any;
}

export enum driverAssociateStatus {
  available = 'available',
  dropping = 'dropping',
  off = 'off',
}
export interface IdriverAssociate {
  _id: string;
  email: string;
  name: string;
  status: driverAssociateStatus;
  currentLocation: Point;
}
export interface IUpdateDALocation {
  email: string;
  location: Point;
}
