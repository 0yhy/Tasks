Function.prototype.BIND = function (thisArg) {
  console.log("OutsideThis:", this);
  if (typeof this !== "function") {
    throw new TypeError("Must be a function!");
  }
  let args = [...arguments].slice(1);
  let thisFun = this;
  return function boundFunc() {
    //如果是作为构造函数调用，this会指向boundFunc而不是全局
    //此时提供的thisArg值将会被忽略
    //但是参数列表会被插入到构造函数调用时的参数列表之前
    if (this instanceof boundFunc) {
      return thisFun.apply(args.concat(...arguments));
    }
    else {
      //此时this指向global对象
      return thisFun.apply(thisArg, args.concat(...arguments));
    }
  };
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
say.BIND(o)();