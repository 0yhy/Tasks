function Person() {};
Person.prototype.name = "Shaw";
Person.prototype.age = 19;
Person.prototype.job = "student";
Person.prototype.sayName = function() {
  console.log(this.name);
}

var person = new Person();
person.name = "Shaw";
person.age = 18;

//Object().keys()返回对象上所有可枚举的实例方法
console.log(Object.keys(Person.prototype));
//[ 'name', 'age', 'job', 'sayName' ]
console.log(Object.keys(person));
//[ 'name', 'age' ]