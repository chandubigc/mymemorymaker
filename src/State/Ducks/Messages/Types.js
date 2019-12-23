const types = {
  ADD_CHAT_MESSAGE: null,
  // ADD_CHAT_MESSAGES: null,
  UPDATE_MESSAGE: null,
  ADD_THIRD_PARTY: null,
  RESPONDED_TO_MSG: null,
  DELETE_MESSAGES_FROM_DB: null,
  REMOVE_DELETED_MESSAGE: null,
  ADD_BROADCAST_MESSAGE: null,
  RESET_MESSAGE_COUNT: null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
