import types from './Types';

export const updateUser = payload =>
  //  console.log('updating user--history', payload);
  ({
    type: types.UPDATE_USER,
    payload,
  });

export const createUser = payload =>
  //  console.log('updating user--history', payload);
  ({
    type: types.CREATE_USER,
    payload,
  });


  export const updateDeviceInfo = payload =>
  //  console.log('updating user--history', payload);
  ({
    type: types.UPDATE_DEVICE_INFO,
    payload,
  });


  export const updateLocation = payload =>
  //  console.log('updating user--history', payload);
  ({
    type: types.UPDATE_LOCATION,
    payload,
  });


  