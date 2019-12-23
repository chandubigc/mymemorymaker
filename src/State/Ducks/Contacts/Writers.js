import types from './Types';
import _ from 'lodash';
import * as contactActions from './Actions';
import * as groupActions from '../ContactGroups/Actions';
import { dispatch } from '../../ReduxStore';

export const contactsWriter = (realm, action) => {
  switch (action.type) {
    case types.ADD_CONTACT: {
      const { contacts } = action.payload;

      console.log('contacts writer', action.payload);

      contacts.forEach(contact => {
        try {
          realm.create('Contacts', contact, true);
        } catch (e) {
          console.log('Error creating contact in db', e);
        }
      });

      break;
    }

    case types.UPDATE_CONTACT: {
      try {
        realm.create('Contacts', action.payload, true);
      } catch (error) {}
      break;
    }

    default:
      break;
  }
};
