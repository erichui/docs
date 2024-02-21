Function.prototype.myCall = function(_this, ...args) {
  const context = _this || window;
  const fn = this;
  context.fn = fn; // key fn 可能会被占用 需要用一个随机 key 名
  const ret = context.fn(...args);
  delete context.fn;
  return ret;
  
}

Function.prototype.myApply = function(_this, args = []) {
  const context = _this || window;
  const fn = this;
  context.fn = fn;
  return context.fn(...args);
}