//工厂模式
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  }
  return o;
}
//构造函数模式
function Person1(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  }
}
var person2 = new Person1("Shaw", 19, "student");
var person1 = new Person1("Shaun", 18, "student");
console.log(person1.sayName == person2.sayName);

//原型模式
function Person2() {};
Person2.prototype.name = "Shaw";
Person2.prototype.age = 19;
Person2.prototype.job = "student";
Person2.prototype.sayName = function() {
  console.log(this.name);
}
var person2 = new Person2();
var person1 = new Person2();
console.log(person1.sayName == person2.sayName);