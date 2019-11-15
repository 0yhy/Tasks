Function.prototype.APPLY = function (thisArg, argArr) {
//   thisArg.func = this;
//   var args = [];
//   for (var i = 0, len = argArr.length; i < len; i++) {
//     args.push('argArr[' + i + ']');
//   }
//   var result = eval('thisArg.func(' + args + ')')
//   delete thisArg.func
//   return result;
// }