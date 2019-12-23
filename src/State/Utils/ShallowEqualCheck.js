export const ShallowEqualCheck = (v, o) => {
  if (v && o) {
    for (var key in v) {
      if (v.hasOwnProperty(key)) {
        if (!(key in o) || v[key] !== o[key]) return false;
      }
    }

    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        if (!(key in v) || v[key] !== o[key]) return false;
      }
    }

    return true;
  }

  return false;
};
