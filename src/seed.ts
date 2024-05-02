import dbClient from './dbClient';
import createAllIndexes from './createIndex';
import IUser from 'IUser';
import IDriverAssociate, {
  DriverAssociateStatus as DriverAssociateStatus,
} from './types/Idriver';
import createOneUser from './services/users/createOne';
import createOneDA from './services/drIvers/createOne';
import findUserByEmail from './services/users/findByEmail';
import findDAByEmail from './services/drIvers/findByEmail';

const daAyush: IDriverAssociate = {
  name: 'Ayush',
  email: 'ayush.garg2020@vitStaff.ac.in',
  status: DriverAssociateStatus.available,
  currentLocation: { coordinates: [0, 0], type: 'Point' },
};

const userChirag: IUser = {
  name: 'Chirag',
  email: 'chirag.grover2020@vitstudent.ac.in',
  password: 'password123',
};

const main = async () => {
  await dbClient();
  await createAllIndexes(); // Checking indexes on seeders might be required if seeders are executed separately.
  const chirag = await findUserByEmail(userChirag.email);
  if (!chirag) {
    await createOneUser(userChirag);
  }
  const Ayush = await findDAByEmail(daAyush.email);
  if (!Ayush) {
    await createOneDA(daAyush);
  }
};

export default main;
