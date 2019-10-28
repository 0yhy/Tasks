function closure(propertyName) {
  return function(obj) {                      //定义并返回了一个闭包，也是一个匿名函数
    return obj[propertyName];   
  };
};

let person = {name: "Shaw", age: 19};
let sayName = closure("name");
let sayAge = closure("age");
console.log(sayName(person), sayAge(person))  //Shaw 19


function createFunctions() {
  var result = new Array();
  for(var i = 0; i < 10; i++) {
    result[i] = function() {
      return i;
    }
  }
  return result;
}
for(let i = 0; i < 10; i++) {
  console.log(createFunctions()[i]());
}

function createFunction() {
  let result = new Array();
  for(var j = 0; j < 10; j++) {
    result [j] = function(num) {
      return function() {
        return num;
      };
    }(j);
  }
  return result;
}
for(let i = 0; i < 10; i++) {
  console.log(createFunctions()[i]());
}