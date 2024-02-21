const strsArr = ['absafj', 'as'];
function test(arr) {
  const firstStr = arr[0];
  let ret = firstStr[0];
  for (let i = 0; i < firstStr.length; i++) {
    const char = firstStr[i];
    for (let j = 1; j < arr.length; j++) {
      if (char !== arr[j][i]) {
        return '';
      }
      if (i > arr[j].length) {}
    }
    ret += char;
  }
}