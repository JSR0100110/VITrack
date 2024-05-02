import { ObjectId, Collection, Document } from 'mongodb';
import IPassenger from '../types/IPassenger';
import dbClient from '../dbClient';
import { dbCollections } from '../constants';

export interface IPassengerDocument
  extends IPassenger,
    Document {
  _id?: ObjectId;
}

const PassengerCollection = async (): Promise<
  Collection<IPassengerDocument>
> => {
  const mongoClient = await dbClient();
  const collection: Collection<IPassengerDocument> = mongoClient
    .db()
    .collection(dbCollections.passengers);
  return collection;
};

export default PassengerCollection;
