import L from 'leaflet';
import iconPickup from './assets/icon_pickup.svg';
import iconDrop from './assets/icon_drop.svg';
import iconDriver from './assets/bus.svg';
import { IInfo, DashboardStatus } from './types';

export const DRIVER_EMAIL_DEFAULT = 'ayush.garg2020@vitStaff.ac.in';
export const USER_EMAIL_DEFAULT = 'chirag.grover2020@vitstudent.ac.in';

export const API_URL = 'http://localhost:5050';

export const pickupMarkerIcon = L.icon({
  iconUrl: iconPickup,
  iconSize: [50, 50], // size of the icon
  popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
  className: 'marker',
});

export const dropMarkerIcon = L.icon({
  iconUrl: iconDrop,
  iconSize: [50, 50], // size of the icon
  popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
  className: 'marker',
});

export const driverMarkerIcon = L.icon({
  iconUrl: iconDriver,
  iconSize: [35, 35], // size of the icon
  popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
  className: 'marker',
});

export const socketEvents = {
  SUBSCRIBE_TO_PASSENGER: 'SUBSCRIBE_TO_PASSENGER',
  SUBSCRIBE_TO_DA: 'SUBSCRIBE_TO_DA',
  DA_LOCATION_CHANGED: 'DA_LOCATION_CHANGED',
  LEAVE_ROOM: 'LEAVE_ROOM',
  PASSENGER_UPDATED: 'PASSENGER_UPDATED',
  PASSENGER_CREATED: 'PASSENGER_CREATED',
  UPDATE_DA_LOCATION: 'UPDATE_DA_LOCATION',
};

export const infoMsgs: Record<DashboardStatus, IInfo> = {
  PASSENGER_INITIATED: {
    title: 'Select Pickup Location',
    msg: 'Move the Pickup marker on the map to choose your pickup location. Click confirm to continue.',
  },
  PICKUP_SELECTED: {
    title: 'Select Drop Location',
    msg: 'Move the Flag marker on the map to choose your Drop location. Click confirm to continue.',
  },
  DROP_SELECTED: {
    title: 'Searching for driver Associates',
    msg: 'Please wait, we are looking for associates to handle your drop',
  },
  NO_PASSENGER: { title: '', msg: '' },
  SEARCHING_ASSOCIATES: { title: '', msg: '' },
  ASSOCIATE_ASSIGNED: {
    title: 'Driver Assigned',
    msg: 'An Associate has been assigned to handle your drop and will soon reach your pickup location',
  },
  PICKUP_LOCATION_REACHED: {
    title: 'Associate reached Pickup location',
    msg: 'Our Associate has arrived at the pickup location',
  },
  TRANSPORTING: {
    title: 'Transporting',
    msg: 'Transporting',
  },
  DROP_LOCATION_REACHED: {
    title: 'Reached Drop location',
    msg: 'Driver reached drop location',
  },
  DROPPED: {
    title: 'Dropped',
    msg: 'The passenger has been dropped successfully',
  },
  CANCELLED: { title: '', msg: '' },
};

export const ACTIONS = {
  FIRST_LOAD: 'FIRST_LOAD',
  NEW_DROPP_CLICKED: 'NEW_DROPP_CLICKED',
  SET_DRIVER_LOCATION: 'SET_DRIVER_LOCATION',
  SET_PICKUP_LOCATION: 'SET_PICKUP_LOCATION',
  SET_DROP_LOCATION: 'SET_DROP_LOCATION',
  ...DashboardStatus,
};

export const mapInitialViewProps: {
  zoom: number;
  center: [number, number];
  scrollWheelZoom: boolean;
} = {
  zoom: 15,
  center: [13.092123232608643, 80.28222309087568],
  scrollWheelZoom: true,
};
