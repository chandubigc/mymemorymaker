const types = {
  UPDATE_USER: null,
  CREATE_USER: null,
  UPDATE_DEVICE_INFO: null,
  UPDATE_LOCATION:null,
};

Object.keys(types).forEach(key => (types[key] = key));

export default types;
