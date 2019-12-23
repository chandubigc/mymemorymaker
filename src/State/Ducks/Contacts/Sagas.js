import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects';
import types from './Types';
import * as contactActions from './Actions';
import * as groupActions from '../ContactGroups/Actions';
import * as contactThreadActions from '../ContactThreads/Actions';
import { Contacts, User } from '../../Model';
import { createUUID } from '../../Utils';
import Api from '../../Middlewares/Api';
import { realmDispatch } from '../../RealmStore';
import { dispatch } from '../../ReduxStore';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import Config from 'react-native-config';
import { Toast } from 'native-base';
import _ from 'lodash';


// eslint-disable-next-line require-yield

export function* syncContactsFromAPI(action) {
  console.log('sync contacts from server',action.payload);

  try {
    const response = yield call(
      Api.get,
      '',
      {},
      'route=user/userapi/myteams&user_token='+action.payload.token
    );
    let userId = action.payload.userId;
    if (response) {
      console.log('data from server', response.data);
      let contacts = response.data.users;
      console.log('CONTACTS', contacts);
      let teams = response.data.teams;
      let contactsMap = {};
      contacts.map(t => {
        contactsMap[t._id] = t;
       
      });
      yield realmDispatch(contactActions.addContact({ contacts: contacts }));
      //
      teams = teams.map(team => {
        let contacts = team.contacts.map(t => {
          let contact = contactsMap[t];
          return contact;
        });
        team.contacts = contacts;
        return team;
      });
      yield realmDispatch(groupActions.writeContactGroupToDB(teams));

      //
      let contactThreads = contacts.map(contact => {
        let contactThread = {
          _id:
            contact._id < userId
              ? `${contact._id}_${userId}`
              : `${userId}_${contact._id}`,
          contact: contactsMap[contact._id],
        };
        return contactThread;
      });

      realmDispatch(
        contactThreadActions.createContactThread({
          contactThreads: contactThreads,
        })
      );
    }
  } catch (error) {
    Toast.show({
      text: 'Error syncing contacts',
      buttonText: 'Please try again',
    });
  }
}

// eslint-disable-next-line require-yield

export function* watchContacts() {
  //  console.log('in contacts watcher');
  yield all([takeLatest(types.SYNC_CONTACTS_FROM_API, syncContactsFromAPI)]);
}
