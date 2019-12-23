/**
 * @description
 * @function rootSaga will act as the watcher of all the sagas
 */
import { all } from 'redux-saga/effects';
import { messageSagas } from '../Ducks/Messages';
import { contactSagas } from '../Ducks/Contacts';
import { groupSagas } from '../Ducks/ContactGroups';
import { userSagas } from '../Ducks/User';

import { contactThreadsSagas } from '../Ducks/ContactThreads';

export function* watchSaga() {
  //  console.log('Sagas middle layer started!................');
}

export default function* rootSaga() {
  yield all([
    watchSaga(),
    messageSagas.watchChatMessages(),
    contactSagas.watchContacts(),
    groupSagas.watchGroupActions(),
    userSagas.watchUser(),
   
    contactThreadsSagas.watchContactThreads(),
  ]);
}
