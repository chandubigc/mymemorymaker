const types = {
  SYNC_CONTACTS_FROM_API: null,
  ADD_CONTACT: null,
  UPDATE_CONTACT: null,
  SUCCESS_WRITE_CONTACTS_TO_DB: null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
