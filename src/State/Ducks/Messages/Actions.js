import types from './Types';

export const addChatMessages = (
  message,
  updateMessageCount = false,
  updateMultipleTablesData
) => {
  console.log('adding chat message', message);
  return {
    type: types.ADD_CHAT_MESSAGE,
    payload: { message, updateMessageCount, updateMultipleTablesData },
  };
};

export const addBroadcastMessage = (
  message,
  updateMessageCount = false,
  forReceiver = false,
  updateMultipleTablesData
) => {
  console.log('adding broadcast message', message);
  return {
    type: types.ADD_BROADCAST_MESSAGE,
    payload: {
      message,
      updateMessageCount,
      forReceiver,
      updateMultipleTablesData,
    },
  };
};

// export const addChatMessagesFromHistory = (messagesMap) => {
//   //  console.log('messages map', addChatMessagesFromHistory);
//   return {
//     type: types.ADD_CHAT_MESSAGES,
//     payload: messagesMap,
//   };
// };

// export const addMessageToState = payload => {
//   return {
//     type: types.ADD_MESSAGE_TO_STATE,
//     payload: payload,
//   };
// };

export const updateMessage = payload => ({
  type: types.UPDATE_MESSAGE,
  payload,
});

export const addThirdParty = payload => ({
  type: types.ADD_THIRD_PARTY,
  payload,
});

export const deleteMessagesFromDB = (
  channelID,
  selectedMessages,
  deleteForEveryone
) => ({
  type: types.DELETE_MESSAGES_FROM_DB,
  payload: {
    channelID,
    selectedMessages,
    deleteForEveryone,
  },
});

export const removeDeletedMessage = payload => ({
  type: types.REMOVE_DELETED_MESSAGE,
  payload,
});

export const processPubnubMessage = msg => ({
  type: types.RESPONDED_TO_MSG,
  payload: msg,
});

export const resetMessageCount = payload => ({
  type: types.RESET_MESSAGE_COUNT,
  payload,
});
