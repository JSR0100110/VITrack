import { Request, Response, NextFunction } from 'express';
import AppRequest from 'AppRequest';
import Passenger, { PassengerStatus as PassengerStatus } from '../types/IPassenger';
import AppResponse from '../types/AppResponse';
import createOne from '../services/Parcel/createOne';
import updateDA from '../services/Parcel/updateDA';
import updateStatus from '../services/Parcel/updateStatus';
import findUserByEmail from '../services/users/findByEmail';
import findDAByEmail from '../services/drIvers/findByEmail';

export const createPassenger = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userEmail = req.body.email;
    const userData = await findUserByEmail(userEmail);
    const userId = userData._id.toString();
    const newPassenger: Passenger = {
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      status: PassengerStatus.requested,
      userId,
    };
    const createdPassenger = await createOne(newPassenger);
    console.log('createdPassenger');
    console.log(createdPassenger);
    const response: AppResponse = {
      data: createdPassenger,
      isError: false,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};

export const patchDriverAssociate = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const passengerId = req.params.id;
    const daEmail = req.body.email;
    const daData = await findDAByEmail(daEmail);
    const driverAssociateId = daData._id.toString();
    const passengerWithDriverAssociate = await updateDA(
      passengerId,
      driverAssociateId
    );
    console.log('passengerWithDriverAssociate');
    console.log(passengerWithDriverAssociate);
    const response: AppResponse = {
      data: passengerWithDriverAssociate,
      isError: false,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};

export const patchStatus = async (
  req: AppRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const passengerId = req.params.id;
    const status = req.body.status;
    const passenger = await updateStatus(passengerId, status);
    const response: AppResponse = {
      data: passenger,
      isError: false,
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};
