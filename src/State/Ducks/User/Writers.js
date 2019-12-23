import types from './Types';
import _ from 'lodash';

export const userWriter = (realm, action) => {
  switch (action.type) {
    case types.CREATE_USER: {
      // const {userData} = action.payload;
      realm.create('User', action.payload, false);
      break;
    }

    case types.UPDATE_USER: {
      // const {userData} = action.payload;
      realm.create('User', action.payload, true);
      break;
    }

    default:
      break;
  }
};
