import { put, call, all, takeEvery, takeLatest } from 'redux-saga/effects';

import types from './Types';
import * as messageActions from './Actions';
import { ChatMessages, cloneRealmObj } from '../../Model';
import Api from '../../Middlewares/Api';
import { realmDispatch } from '../../RealmStore';

import moment from 'moment';

export function* thirdParty(action) {
  try {
    const response = yield call(
      Api.post,
      '/dealalerts/addthirdparty',
      action.payload
    );
    //  console.log('response from change deal end date api', response);
    if (response.data.status) {
      let copy = ChatMessages.byPK(action.payload.messageID);
      if (copy) {
        if (copy.messageType === '3PTY') {
          copy = cloneRealmObj(copy);
          copy.sentTime = moment().valueOf();
          copy.status = 'sent';
          realmDispatch(messageActions.updateMessage(copy));
        }
      }
    } else {
      //  console.log(response.data.message);
    }
  } catch (error) {
    console.log('error adding thirdparty', action.payload);
  }
}

export function* watchChatMessages() {
  //  console.log('in chatmessages watcher');
  yield all([takeEvery(types.ADD_THIRD_PARTY, thirdParty)]);
}
