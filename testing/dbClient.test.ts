/*import { MongoClient } from 'mongodb';
import dbConnect from './dbClient';

describe('Database Connection', () => {
  let client: MongoClient;

  beforeAll(async () => {
    client = await dbConnect();
  });

  afterAll(async () => {
    await client.close();
  });

  it('should connect to the database', () => {
    expect(client.isConnected()).toBe(true);
  });
}); */ 