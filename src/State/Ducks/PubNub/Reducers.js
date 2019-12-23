import types from './Types';
import { combineReducers } from 'redux';

function pubnubConnection(state = { connected: false, connecting: false }, action) {
  // //  console.log ('pubnubConnection', arguments);
  switch (action.type) {
    case types.CONNECTING:
      return { connected: false, connecting: true };
    case types.CONNECTED:
      return { connected: true, connecting: false };
    case types.DISCONNECTED:
      return { connected: false, connecting: false };
    case types.FCMREGISTER:
      return { connected: true, connecting: false, fcmregistered: true };
    default:
      return state;
  }
}

export default combineReducers({
  pubnubConnection,
});
