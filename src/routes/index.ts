import { Router } from 'express';
import { pong } from '../controller/ping';
import * as passenger from '../controller/parCels';

let routes = Router();

/**
 * Health check route.
 * Always returns 200 OK
 */
routes.get('/ping', pong);

// Passenger
routes.post('/passenger', passenger.createPassenger);
routes.patch(
  '/passenger/:id/driver-associate',
  passenger.patchDriverAssociate
);
routes.patch('/passenger/:id/status', passenger.patchStatus);
export default routes;
