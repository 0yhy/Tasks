function NEW(obj) {
  let newObj = {};
  newObj.__proto__ = obj.prototype;
  obj.APPLY(newObj, arguments);
  return newObj;
};

Function.prototype.APPLY = function (thisArg, argArr) {
  thisArg = thisArg || window;
  thisArg.func = this;
  let result;
  if (arguments[1]) {
    result = thisArg.func(...argArr);
  }
  else {
    result = thisArg.func();
  }
  delete thisArg.func
  return result;
}

let arr = NEW(Array);
arr.push(1, 2, 3);
arr.pop();
console.log(arr instanceof Array);
console.log(arr);