function promiseAll(iterator) {
  return new Promise((resolve, reject) => {
    const ret = [];
    let count = 0;
    let total = 0;
    for (const item of iterator) {
      const index = total;
      Promise.resolve(item)
        .then(val => {
          count += 1;
          ret[index] = val;
          if (count === total) resolve(ret);
        }, reject);
      total += 1;
    }
  })
}

function promiseAny(iterator) {
  return new Promise((resovel, reject) => {
    const errs = [];
    let total = 0;
    let count = 0;
    for(item of iterator) {
      let index = total;
      Promise.resolve(item)
        .then(resolve)
        .catch(err => {
          count += 1;
          errs[index] = err;
          if (count === total) {
            reject(Object.assign(new Error('all reject'), { errors: errs }));
          }
        })
      total++;
    }
  })
}
