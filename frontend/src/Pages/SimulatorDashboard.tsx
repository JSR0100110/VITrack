import { useEffect, useState, useRef, useMemo } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import L, { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import throttle from 'lodash/throttle';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import { DRIVER_EMAIL_DEFAULT, API_URL, socketEvents } from '../constants';

import {
  IPassenger,
  PassengerStatus,
  IdriverAssociate,
  IUpdateDALocation,
} from '../types';

import iconDriverAssociate from '../assets/icon_driver_associate.svg';
import iconPickup from '../assets/icon_pickup.svg';
import iconDrop from '../assets/icon_drop.svg';

import DriverDashboard from '../components/DriverDashboard';
import PassengerDashboard from '../components/PassengerDashboard';

import './dashboard.css';

const initialValues: {
  zoom: number;
  center: [number, number];
  scrollWheelZoom: boolean;
} = {
  zoom: 15,
  center: [12.9692, 79.1559],
  scrollWheelZoom: true,
};
const mapContainerStyle = {
  width: '100%',
  height: '99vh',
};
const THROTTLE_DELAY = 50;
const socket = io(API_URL);

const SimulatorDashboard = () => {
  const [driverAssociate, setDriverAssociate] =
    // @ts-ignore
    useState<IdriverAssociate>({});
  // @ts-ignore
  const [passengerData, setPassengerData] = useState<IPassenger>({});
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(initialValues.center);

  useEffect(() => {
    // Setting the seeded driver email to identify a logged in driver
    // Modify this part as per your needs like setting an auth token
    sessionStorage.setItem('driverEmail', DRIVER_EMAIL_DEFAULT);

    // Establish Socket
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    // on Unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);
  //Location information sent to backend
  const gpsUpdate = (position: any) => {
    if (position instanceof LatLng) {
      const email = sessionStorage.getItem('driverEmail') || '';
      const data: IUpdateDALocation = {
        email: email,
        location: { type: 'Point', coordinates: [position.lng, position.lat] },
      };
      socket.emit(socketEvents.UPDATE_DA_LOCATION, data);
    }
  };

  // position side effects
  useEffect(() => {
    gpsUpdate(position);
  }, [position]);

  const throttledPositionUpdate = throttle(function (position) {
    console.log('throttled position', position);
    gpsUpdate(position);
  }, THROTTLE_DELAY);

  function DraggableMarker() {
    const markerIcon = L.icon({
      iconUrl: iconDriverAssociate,
      iconSize: [35, 35], // size of the icon
      popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
      className: 'marker',
    });
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            // @ts-ignore
            setPosition(marker.getLatLng());
          }
        },
        drag() {
          const marker = markerRef.current;
          if (marker != null) {
            // @ts-ignore
            throttledPositionUpdate(marker.getLatLng());
          }
        },
      }),
      []
    );

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
        icon={markerIcon}
      ></Marker>
    );
  }
  const PickUpMarker = () => {
    const markerIcon = L.icon({
      iconUrl: iconPickup,
      iconSize: [70, 50], // size of the icon
      popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
    });
    try {
      const passenger = passengerData as IPassenger;
      const coordinates = passenger?.pickupLocation?.coordinates;
      return Array.isArray(coordinates) ? (
        <Marker position={[coordinates[1], coordinates[0]]} icon={markerIcon}>
          <Popup>Pickup location</Popup>
        </Marker>
      ) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const DropLocationMarker = () => {
    const markerIcon = L.icon({
      iconUrl: iconDrop,
      iconSize: [50, 40], // size of the icon
      popupAnchor: [-3, -20], // point from which the popup should open relative to the iconAnchor
    });
    try {
      const passenger = passengerData as IPassenger;
      const coordinates = passenger?.dropLocation?.coordinates;
      return Array.isArray(coordinates) ? (
        <Marker position={[coordinates[1], coordinates[0]]} icon={markerIcon}>
          <Popup>Drop location</Popup>
        </Marker>
      ) : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className='container'>
      <div className='col-1'>
        <div>
          <DriverDashboard socket={socket} setPassengerData={setPassengerData} />
          {passengerData._id ? (
            <PassengerDashboard
              passengerData={passengerData}
              setPassengerData={setPassengerData}
            />
          ) : null}
        </div>
      </div>
      <div className='col-2'>
        <div>
          <MapContainer style={mapContainerStyle} {...initialValues}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <DraggableMarker />
            {passengerData._id &&
            passengerData.status !== PassengerStatus.dropped ? (
              <PickUpMarker />
            ) : null}
            {passengerData._id &&
            passengerData.status !== PassengerStatus.dropped ? (
              <DropLocationMarker />
            ) : null}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
export default SimulatorDashboard;
