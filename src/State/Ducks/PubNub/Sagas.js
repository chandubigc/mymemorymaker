
import { takeEvery, all, put, select } from 'redux-saga/effects';
import types from './Types';

export function* connectToPubnub(action) {
    console.log('connectToPubnub', action);
    console.log('+++connectingToPubnub+++', new Date().getTime());
  yield put({ type: types.CONNECTING });

  const connected = true;
//  yield pubnubService.start(action.payload.userId);
  //  console.log('connected = ', connected);
  yield put({ type: connected ? types.CONNECTED : types.DISCONNECTED });
}

export function* disconnectPubnub(action) {
    console.log('discconnectPubnub', action);
 // pubnubService.stop();
  yield put({ type: types.DISCONNECTED });
}

export function* addFCMChannel(action) {
  //  console.log('addFCMChannel SAGAS', action);
//  pubnubService.fcmRegister(action.payload.fcmToken);
  // yield put ({type: types.FCMREGISTER});
}

export function* addChannelToPush(action) {
  //  console.log('addFCMChannel SAGAS', action);
 // pubnubService.addChannelToPush(action.payload.channelsList);
  // yield put ({type: types.FCMREGISTER});
}

export function* removeChannelFromPush(action) {
  //  console.log('addFCMChannel SAGAS', action);
  //pubnubService.removeChannelFromPush(action.payload.channelsList);
  // yield put ({type: types.FCMREGISTER});
}

export function* togglePubnub(action) {
   console.log("INSIDE PUBNUB",action.payload);
  const status = yield select(state => state.pubnubConnection);
  yield put({
    type: status.connected ? types.DISCONNECT : types.CONNECT,
    payload: action.payload,
  });
}

export function* wakeupWatchOutBox(action) {
  //  console.log('waking up watchoutBox SAGAS', action);
  pubnubService.wakeupWatchOutbox(action.payload.userId);
}

export function* watchConnectionMessages() {
  //  console.log('watchConnectionMessages');
  yield all([
    takeEvery(types.CONNECT, connectToPubnub),
    takeEvery(types.DISCONNECT, disconnectPubnub),
    takeEvery(types.TOGGLE, togglePubnub),
    takeEvery(types.FCMREGISTER, addFCMChannel),
    takeEvery(types.REMOVECHANNELFROMPUSH, removeChannelFromPush),
    takeEvery(types.ADDCHANNELTOPUSH, addChannelToPush),
    takeEvery(types.WAKEUP_WATCHOUTBOX, wakeupWatchOutBox),
  ]);
}

// export default function* pubnubSaga () {
//   //  console.log ('rootSaga');
//   yield all ([watchConnectionMessages ()]);
// }
