function NEW(obj) {
  let newObj = {};
  newObj.__proto__ = obj.prototype;
  obj.apply(newObj, arguments);
  return newObj;
};

let a = NEW(Array);
let b = new Array();
a.push(1);
b.push(2);
console.log(a);
console.log(b);