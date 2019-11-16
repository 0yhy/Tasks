Function.prototype.CALL = function (thisArg) {
  thisArg = thisArg || window;
  thisArg.func = this;
  let args = [...arguments].slice(1);
  let result = thisArg.func(...args);
  delete thisArg.func;
  return result;
};

global.color = "red";
let o = {
  color: "blue",
  sayColor: function () {
    console.log(this.color);
  }
};
o.sayColor();
let say = o.sayColor;
say();
say.CALL(o);

function sum(num1, num2) {
  return num1 + num2;
};
function callSum1(num1, num2) {
  return sum.CALL(this, num1, num2);
}
console.log(callSum1(10, 5));
