import types from './Types';

export function connectToPubnub(payload) {
  return { type: types.CONNECT, payload };
}
export function disconnectPubnub(payload) {
  return { type: types.DISCONNECT, payload };
}
export function toggleConnection(payload) {
    console.log('+++toggleConnection+++', new Date().getTime());
  return { type: types.TOGGLE, payload };
}

export function addFCMChannel(payload) {
  //  console.log('addFCMChannel--in actions', payload);
  return { type: types.FCMREGISTER, payload };
}

export function addChannelToPush(payload) {
  console.log('addChannelToPush--in actions', payload);
  return { type: types.ADDCHANNELTOPUSH, payload };
}

export function removeChannelFromPush(payload) {
  //  console.log('addFCMChannel--in actions', payload);
  return { type: types.REMOVECHANNELFROMPUSH, payload };
}

export function wakeupWatchOutBox(payload) {
  //  console.log('wakeup WatchOutBox', payload);
  return { type: types.WAKEUP_WATCHOUTBOX, payload };
}
