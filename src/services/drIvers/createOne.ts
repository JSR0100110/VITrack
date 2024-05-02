import DriverAssociateCollection, {
  IDriverAssociateDocument,
} from '../../models/driver';
import IDriverAssociate from '../../types/Idriver';

export default async function createOne(
  driverAssociate: IDriverAssociate
): Promise<IDriverAssociateDocument> {
  try {
    const collection = await DriverAssociateCollection();
    const newDoc = await collection.insertOne(driverAssociate);
    const result = await collection.findOne({ _id: newDoc.insertedId });
    return result;
  } catch (error) {
    throw error;
  }
}
