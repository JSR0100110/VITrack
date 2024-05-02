import DriverAssociateCollection, {
  IDriverAssociateDocument,
} from '../../models/driver';

const findByEmail = async (
  email: string
): Promise<IDriverAssociateDocument | null> => {
  try {
    const collection = await DriverAssociateCollection();
    const associate = await collection.findOne({ email });
    return associate;
  } catch (error) {
    throw error;
  }
};
export default findByEmail;
