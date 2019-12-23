import types from './Types';
import { realmDispatch } from '../../RealmStore';
import { createUUID } from '../../Utils';
import { cloneRealmObj, ChatMessages, ContactGroups } from '../../Model';
import { linkMessagesToContactThread } from '../../Ducks/ContactThreads/Utils';
export const contactThreadsWriter = (realm, action) => {
  switch (action.type) {
    case types.UPDATE_CONTACT_THREAD: {
      realm.create('ContactThreads', action.payload, true);
      break;
    }

    case types.DELETE_CONTACT_THREAD: {
      try {
        realm.delete(action.payload);
      } catch (e) {
        console.log(
          'Error deleting contact thread, is it live obj?',
          action.payload
        );
      }
      break;
    }

    case types.CREATE_CONTACT_THREAD: {
      const { contactThreads } = action.payload;

      console.log('contactThreads writer', action.payload);

      contactThreads.forEach(contactThread => {
        try {
          realm.create('ContactThreads', contactThread, true);
        } catch (e) {
          console.log('Error creating contactThread in db', e);
        }
      });

      break;
    }

    default:
      break;
  }
};
