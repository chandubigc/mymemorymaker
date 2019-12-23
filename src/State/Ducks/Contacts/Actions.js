import types from './Types';

export const addContact = payload =>
  // //  console.log ('action add contact', contacts);
  ({
    type: types.ADD_CONTACT,
    payload,
  });
export const updateContact = payload =>
  //  console.log('action update contact', payload);
  ({
    type: types.UPDATE_CONTACT,
    payload,
  });
export const syncContacts = payload => ({
  
  type: types.SYNC_CONTACTS_FROM_API,
  payload,
});

export const onSuccessWritingLocalContactsToDB = payload =>
  // console.log('on success writing contacts...', payload);
  ({
    type: types.SUCCESS_WRITE_CONTACTS_TO_DB,
    payload,
  });
