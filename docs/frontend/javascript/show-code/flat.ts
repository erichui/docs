const arr = [1, 2, [3, 4], [5, [6, 7]]];

arr.flat();
arr.flat(1);
arr.flat(Infinity);

// reg
const str = JSON.stringify(arr);
const strFilter = str.replace(/[\[\]]/g, '');
JSON.parse(`[${strFilter}]`);

// recursion
const ret = [];
function recursionArrFlat(arr = []) {
  for(let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      recursionArrFlat(arr[i]);
    } else {
      ret.push(arr[i]);
    }
  }
}

// reduce recursion
function reduceArrFlat(arr = []) {
  return arr.reduce((pre, current) => {
    return pre.concat(Array.isArray(current) ? reduceArrFlat(current) : current);
  }, []);
}