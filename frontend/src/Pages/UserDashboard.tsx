import { useEffect, useState, useReducer } from 'react';
import io from 'socket.io-client';
import { LatLng } from 'leaflet';
import { Point } from 'geojson';
import { MapContainer, TileLayer } from 'react-leaflet';
import Button from '@mui/material/Button';
import 'leaflet/dist/leaflet.css';

import UserInfo from '../components/UserInfo';
import DraggableMarker from '../components/DraggableMarker';
import PassengerInfo from '../components/PassengerInfo';
import {
  DashboardStatus,
  State,
  IAction,
  IPassenger,
  PassengerStatus,
} from '../types';
import {
  USER_EMAIL_DEFAULT,
  pickupMarkerIcon,
  dropMarkerIcon,
  driverMarkerIcon,
  API_URL,
  socketEvents,
  mapInitialViewProps,
  ACTIONS,
} from '../constants';
import { createPassenger } from '../api';
import './dashboard.css';

const socket = io(API_URL);

const initialState: State = {
  pickupLocation: new LatLng(12.969221, 79.155934),
  isPickupDraggable: false,
  isShowPickupMarker: false,
  dropLocation: new LatLng(12.969421, 79.155943),
  isDropDraggable: false,
  isShowDropMarker: false,
  driverLocation: null,
  dashboardStatus: DashboardStatus.NO_PASSENGER,
};

function reducer(state: State, action: IAction): State {
  switch (action.type) {
    case ACTIONS.NEW_DROPP_CLICKED:
      return {
        ...state,
        isPickupDraggable: true,
        isShowPickupMarker: true,
        dashboardStatus: DashboardStatus.PASSENGER_INITIATED,
      };
    case ACTIONS.SET_DRIVER_LOCATION:
      return {
        ...state,
        driverLocation: action.payload.position, // position should be Leaflet LatLng
      };
    case ACTIONS.SET_PICKUP_LOCATION:
      return {
        ...state,
        pickupLocation: action.payload.position, // position should be Leaflet LatLng
      };
    case ACTIONS.SET_DROP_LOCATION:
      return {
        ...state,
        dropLocation: action.payload.position, // position should be Leaflet LatLng
      };
    case ACTIONS.PICKUP_SELECTED:
      return {
        ...state,
        isPickupDraggable: false,
        isDropDraggable: true,
        isShowDropMarker: true,
        dashboardStatus: DashboardStatus.PICKUP_SELECTED,
      };
    case ACTIONS.DROP_SELECTED:
      return {
        ...state,
        isDropDraggable: false,
        dashboardStatus: DashboardStatus.DROP_SELECTED,
      };
    case ACTIONS.ASSOCIATE_ASSIGNED:
      return {
        ...state,
        dashboardStatus: DashboardStatus.ASSOCIATE_ASSIGNED,
      };
    case ACTIONS.PICKUP_LOCATION_REACHED:
      return {
        ...state,
        dashboardStatus: DashboardStatus.PICKUP_LOCATION_REACHED,
      };
    case ACTIONS.TRANSPORTING:
      return {
        ...state,
        dashboardStatus: DashboardStatus.TRANSPORTING,
      };
    case ACTIONS.DROP_LOCATION_REACHED:
      return {
        ...state,
        dashboardStatus: DashboardStatus.DROP_LOCATION_REACHED,
      };
    case ACTIONS.DROPPED:
      return {
        ...state,
        dashboardStatus: DashboardStatus.DROPPED,
      };
    default:
      console.log('default action');
      return state;
  }
}

const passengerStatusActionMapper: Record<PassengerStatus, IAction> = {
  requested: { type: 'Default' },
  driverAssociateAssigned: { type: ACTIONS.ASSOCIATE_ASSIGNED },
  pickupLocationReached: { type: ACTIONS.PICKUP_LOCATION_REACHED },
  transporting: { type: ACTIONS.TRANSPORTING },
  dropLocationReached: { type: ACTIONS.DROP_LOCATION_REACHED },
  dropped: { type: ACTIONS.DROPPED },
  cancelled: { type: ACTIONS.CANCELLED },
};

const UserDashboard = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Setting seeded user's email as logged in user
    // You can change this to update logged in user email or id
    sessionStorage.setItem('userEmail', USER_EMAIL_DEFAULT);

    // Establish Socket
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    //updation of Location 
    socket.on(socketEvents.DA_LOCATION_CHANGED, (data) => {
      try {
        const coorArr = data?.currentLocation?.coordinates;
        const isNumberType = (value: any) => typeof value === 'number';
        if (
          Array.isArray(coorArr) &&
          coorArr.length === 2 &&
          isNumberType(coorArr[0]) &&
          isNumberType(coorArr[1])
        ) {
          const lat = coorArr[1];
          const lng = coorArr[0];
          const newLocation = new LatLng(lat, lng);
          const action = {
            type: ACTIONS.SET_DRIVER_LOCATION,
            payload: { position: newLocation },
          };
          dispatch(action);
        }
      } catch (error) {
        console.error(error);
      }
    });

    // Listens to Driver updates once subscribed
    socket.on(socketEvents.PASSENGER_UPDATED, (data: IPassenger) => {
      try {
        console.log({ data });
        // Subscribe to driver associate
        if (data.driverAssociateId) {
          socket.emit(socketEvents.SUBSCRIBE_TO_DA, {
            driverAssociateId: data.driverAssociateId,
          });
        }
        // Dispatch Action on Passenger status change
        if (data.status) {
          dispatch(passengerStatusActionMapper[data.status]);
        }
      } catch (error) {
        console.error(error);
      }
    });

    // on Unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const setPickupLocation = (position: LatLng) => {
    const action = {
      type: ACTIONS.SET_PICKUP_LOCATION,
      payload: { position },
    };
    dispatch(action);
  };
  const setDropLocation = (position: LatLng) => {
    const action = {
      type: ACTIONS.SET_DROP_LOCATION,
      payload: { position },
    };
    dispatch(action);
  };
  const onNewDriverClick = () => {
    const action = {
      type: ACTIONS.NEW_DROPP_CLICKED,
      payload: {},
    };
    dispatch(action);
  };
  const onPickupSelected = () => {
    const action = { type: ACTIONS.PICKUP_SELECTED, payload: {} };
    dispatch(action);
  };
  const onDropSelected = async () => {
    try {
      const action = { type: ACTIONS.DROP_SELECTED, payload: {} };
      await dispatch(action);
      const pickupPoint: Point = {
        type: 'Point',
        coordinates: [state.pickupLocation.lng, state.pickupLocation.lat],
      };
      const dropPoint: Point = {
        type: 'Point',
        coordinates: [state.dropLocation.lng, state.dropLocation.lat],
      };
      // Call API to Create new Passenger
      const createPassengerOp = await createPassenger(pickupPoint, dropPoint);
      const passenger = createPassengerOp.data;
      // Subscribe to MongoDB Change Stream via Socket io for the created Passenger
      socket.emit(socketEvents.SUBSCRIBE_TO_PASSENGER, {
        passengerId: passenger._id,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const ButtonNewDriver = () => {
    return (
      <Button
        variant='contained'
        onClick={() => {
          onNewDriverClick();
        }}
      >
        New Passenger
      </Button>
    );
  };
  const ButtonConfirmPickUp = () => {
    return (
      <Button
        variant='contained'
        onClick={() => {
          onPickupSelected();
        }}
      >
        Confirm Pickup Location
      </Button>
    );
  };
  const ButtonConfirmDrop = () => {
    return (
      <Button
        variant='contained'
        onClick={() => {
          onDropSelected();
        }}
      >
        Confirm Drop Location
      </Button>
    );
  };

  return (
    <div className='container'>
      <div className='col-1'>
        <UserInfo />
        {/* Passenger info */}
        <div className='flex-center'>
          <PassengerInfo dashboardStatus={state.dashboardStatus} />
        </div>
        {/* Action button */}
        <div className='flex-center'>
          {state.dashboardStatus === DashboardStatus.NO_PASSENGER && (
            <ButtonNewDriver />
          )}
          {state.dashboardStatus === DashboardStatus.PASSENGER_INITIATED && (
            <ButtonConfirmPickUp />
          )}
          {state.dashboardStatus === DashboardStatus.PICKUP_SELECTED && (
            <ButtonConfirmDrop />
          )}
        </div>
      </div>
      <div className='col-2'>
        <MapContainer
          style={{ width: '100%', height: '99vh' }}
          {...mapInitialViewProps}
        >
          <TileLayer
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Pickup Marker */}
          {state.isShowPickupMarker ? (
            <DraggableMarker
              isDraggable={state.isPickupDraggable}
              position={state.pickupLocation}
              setPosition={setPickupLocation}
              markerIcon={pickupMarkerIcon}
              key={'pickup-marker'}
              markerName={'pickup-marker'}
              popupMsg='Mark your pickup location'
            />
          ) : null}
          {/* Drop Location Marker */}
          {state.isShowDropMarker ? (
            <DraggableMarker
              isDraggable={state.isDropDraggable}
              position={state.dropLocation}
              setPosition={setDropLocation}
              markerIcon={dropMarkerIcon}
              key={'drop-marker'}
              markerName={'drop-marker'}
              popupMsg='Mark your drop location'
            />
          ) : null}
          {/* Driver Location Marker */}
          {state.driverLocation && (
            <DraggableMarker
              isDraggable={false}
              position={state.driverLocation}
              markerIcon={driverMarkerIcon}
              key={'Driver-marker'}
              markerName={'Driver-marker'}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
};
export default UserDashboard;
