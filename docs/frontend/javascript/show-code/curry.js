function add(a, b, c, d, e) {
  return a + b + c + d + e;
}

function curry(fn) {
  const paramsLength = fn.length;
  console.log(paramsLength, 'paramsLength');
  let params = [];
  function _curry() {
    return function(...args) {
      params = params.concat(args);
      if (params.length === paramsLength) {
        return fn(...params);
      }
      return _curry();
    };
  }
  return _curry();
}

const fn = curry(add);
console.log(fn(1)(2, 3)(4, 5)(6));