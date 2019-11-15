Function.prototype.APPLY = (thisArg, argArr) => {
  thisArg.func = this;        //this是调用apply方法的函数
  var args = [];
  for (var i = 0, len = argArr.length; i < len; i++) {
    args.push('argArr[' + i + ']');
  }
  var result = eval('thisArg.func(' + args + ')')
  delete thisArg.func;
  return result;
};
//？？？？箭头函数？？？
// Function.prototype.APPLY = function (thisArg, argArr) {
//   thisArg.func = this;
//   var args = [];
//   for (var i = 0, len = argArr.length; i < len; i++) {
//     args.push('argArr[' + i + ']');
//   }
//   var result = eval('thisArg.func(' + args + ')')
//   delete thisArg.func
//   return result;
// }


global.color = "red";
let o = { color: "blue" };
function sayColor() {
  console.log(this.color);
}

function sum(num1, num2) {
  return num1 + num2;
};
function callSum1(num1, num2) {
  return sum.APPLY(this, arguments);
}
console.log(callSum1(10, 5));