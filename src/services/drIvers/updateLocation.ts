import { Point } from 'geojson';
import DriverAssociateCollection from '../../models/driver';

const updateLocation = async (
  email: string,
  location: Point
): Promise<void> => {
  try {
    const collection = await DriverAssociateCollection();
    await collection.findOneAndUpdate(
      { email },
      { $set: { currentLocation: location } }
    );
  } catch (error) {
    throw error;
  }
};
export default updateLocation;
