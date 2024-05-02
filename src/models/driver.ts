import { ObjectId, Collection, Document } from 'mongodb';
import IDriverAssociate from '../types/Idriver';
import dbClient from '../dbClient';
import { dbCollections } from '../constants';

export interface IDriverAssociateDocument
  extends IDriverAssociate,
    Document {
  _id?: ObjectId;
}

const DriverAssociateCollection = async (): Promise<
  Collection<IDriverAssociateDocument>
> => {
  const mongoClient = await dbClient();
  const collection: Collection<IDriverAssociateDocument> = mongoClient
    .db()
    .collection(dbCollections.driverAssociates);
  return collection;
};

export default DriverAssociateCollection;
