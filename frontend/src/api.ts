import axios from 'axios';
import { Point } from 'geojson';
import { API_URL, USER_EMAIL_DEFAULT } from './constants';
import { PassengerStatus as PassengerStatus, PassengerRes as PassengerRes } from './types';

export const createPassenger = async (
  pickupLocation: Point,
  dropLocation: Point
): Promise<any> => {
  const email = sessionStorage.getItem('userEmail') || USER_EMAIL_DEFAULT;
  const data = { pickupLocation, dropLocation, email };
  const config = {
    method: 'post',
    url: `${API_URL}/passenger`,
    data: data,
  };
  const response = await axios(config);
  return response.data as any;
};

export const updatePassengerStatus = async (
  id: string,
  status: PassengerStatus
): Promise<PassengerRes> => {
  const requestBody = { status };
  try {
    const response = await axios.patch(
      `${API_URL}/passenger/${id}/status`,
      requestBody
    );
    return response.data as PassengerRes;
  } catch (error) {
    throw error;
  }
};

export const updatePassengerDriverAssociate = async (
  id: string,
  email: string
): Promise<PassengerRes> => {
  const requestBody = { email };
  try {
    const response = await axios.patch(
      `${API_URL}/passenger/${id}/driver-associate`,
      requestBody
    );
    return response.data as PassengerRes;
  } catch (error) {
    throw error;
  }
};
