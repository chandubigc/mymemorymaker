const types = {
  WRITE_CONTACTGROUP_TO_DB: null,
  UPDATE_CONTACTGROUP_TO_DB: null,
  DELETE_CONTACTGROUP_FROM_DB: null,
  SYNC_GROUPS_FROM_SERVER: null,
  WRITE_CONTACTGROUP_FROM_SERVER: null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
