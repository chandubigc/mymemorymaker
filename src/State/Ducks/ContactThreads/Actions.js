import types from './Types';

export const updateContactThread = payload => ({
  type: types.UPDATE_CONTACT_THREAD,
  payload,
});

export const createContactThread = payload => ({
  type: types.CREATE_CONTACT_THREAD,
  payload,
});

export const deleteContactThread = payload => ({
  type: types.DELETE_CONTACT_THREAD,
  payload,
});
