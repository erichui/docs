const obj = {
  name: 'ada',
  gender: 'femal',
  info: {
    age: 30,
    company: 'taomi',
  },
  fn: function () {},
};

function shallowCopy(obj) {
  // const ret = {};
  // for(const key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     ret[key] = obj[key];
  //   }
  // }
  // return ret;
  return Object.entries(obj).reduce((pre, current) => {
    const [key, value] = current;
    pre[key] = value;
    return pre;
  }, {})
};

function copy(target) {
  if (typeof target === 'object' && target !== null) {
    const ret = Array.isArray(target)
      ? []
      : {};
    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        ret[key] = copy(target[key]);
      }
    }
    return ret;
  } else {
    return target;
  }
};