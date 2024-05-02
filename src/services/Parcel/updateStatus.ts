import { ObjectId } from 'mongodb';
import PassengerCollection, { IPassengerDocument } from '../../models/Parcels';
import { PassengerStatus } from '../../types/IPassenger';

export default async function updateStatus(
  _id: string,
  status: PassengerStatus
): Promise<IPassengerDocument> {
  try {
    const collection = await PassengerCollection();
    await collection.findOneAndUpdate(
      { _id: new ObjectId(_id) },
      { $set: { status } }
    );
    const result = await collection.findOne({ _id: new ObjectId(_id) });
    return result;
  } catch (error) {
    throw error;
  }
}
