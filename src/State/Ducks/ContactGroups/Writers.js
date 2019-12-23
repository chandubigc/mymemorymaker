import types from './Types';
import _ from 'lodash';

export const contactGroupWriter = (realm, action) => {
  switch (action.type) {
    case types.WRITE_CONTACTGROUP_FROM_SERVER: {
      if (action.payload.groupsList instanceof Array) {
        _.forEach(action.payload.groupsList, item => {
          try {
            realm.create('ContactGroups', item, true);
          } catch (error) {}
        });
      } else {
        try {
          realm.create('ContactGroups', action.payload.groupsList, false);
        } catch (error) {}
      }
      realm.create(
        'User',
        {
          _id: action.payload.userId,
          isGroupSyncDone: true,
        },
        true
      );
      break;
    }

    case types.WRITE_CONTACTGROUP_TO_DB: {
      const { contactGroupData } = action.payload;
      if (contactGroupData instanceof Array) {
        _.forEach(contactGroupData, item => {
          try {
            realm.create('ContactGroups', item, true);
          } catch (error) {}
        });
      } else {
        try {
          realm.create('ContactGroups', contactGroupData, false);
        } catch (error) {}
      }

      break;
    }

    case types.UPDATE_CONTACTGROUP_TO_DB: {
      const { contactGroupData } = action.payload;
      try {
        realm.create('ContactGroups', contactGroupData, true);
      } catch (error) {}
      break;
    }

    case types.DELETE_CONTACTGROUP_FROM_DB: {
      const contactGroupData = action.payload;
      try {
        realm.create('ContactGroups', contactGroupData, true);
      } catch (error) {}
      // realm.delete (action.payload);
      break;
    }

    default:
      break;
  }
};
