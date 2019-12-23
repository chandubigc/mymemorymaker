const types = {
  CONNECT: null,
  CONNECTING: null,
  CONNECTED: null,
  DISCONNECT: null,
  DISCONNECTED: null,
  FCMREGISTER: null,
  TOGGLE: null,
  RESPONDED_TO_MSG: null,
  WAKEUP_WATCHOUTBOX: null,
  ADDCHANNELTOPUSH: null,
  REMOVECHANNELFROMPUSH: null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
