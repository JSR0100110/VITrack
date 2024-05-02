const socketEvents = {
  // DA means DRIVER_ASSOCIATE
  UPDATE_DA_LOCATION: 'UPDATE_DA_LOCATION',
  DA_LOCATION_CHANGED: 'DA_LOCATION_CHANGED',

  PASSENGER_CREATED: 'PASSENGER_CREATED',
  PASSENGER_UPDATED: 'PASSENGER_UPDATED',

  SUBSCRIBE_TO_PASSENGER: 'SUBSCRIBE_TO_PASSENGER',
  SUBSCRIBE_TO_DA: 'SUBSCRIBE_TO_DA',

  LEAVE_ROOM: 'LEAVE_ROOM',
};

const dbCollections = {
  users: 'users',
  passengers: 'passengers',
  driverAssociates: 'driverAssociates',
};

export { socketEvents, dbCollections };
