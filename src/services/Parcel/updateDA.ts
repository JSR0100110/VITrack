import { ObjectId } from 'mongodb';
import PassengerCollection, { IPassengerDocument } from '../../models/Parcels';

export default async function updateDA(
  _id: string,
  driverAssociateId: string
): Promise<IPassengerDocument> {
  try {
    const collection = await PassengerCollection();
    await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { driverAssociateId: driverAssociateId } }
    );
    const result = await collection.findOne({ _id: new ObjectId(_id) });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
