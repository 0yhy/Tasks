function closure(propertyName) {
  return function(obj) {                      //定义并返回了一个闭包，也是一个匿名函数
    return obj[propertyName];   
  };
};

let person = {name: "Shaw", age: 19};
let sayName = closure("name");
let sayAge = closure("age");
console.log(sayName(person), sayAge(person))  //Shaw 19
