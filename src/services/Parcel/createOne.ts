import PassengerCollection, {
  IPassengerDocument,
} from '../../models/Parcels';
import IPassenger from '../../types/IPassenger';

export default async function createOne(
  passenger: IPassenger
): Promise<IPassengerDocument> {
  try {
    const collection = await PassengerCollection();
    const newDoc = await collection.insertOne(passenger);
    const result = await collection.findOne({ _id: newDoc.insertedId });
    return result;
  } catch (error) {
    throw error;
  }
}
