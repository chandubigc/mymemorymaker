const types = {
  UPDATE_CONTACT_THREAD: null,
  CREATE_CONTACT_THREAD: null,
  DELETE_CONTACT_THREAD: null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
