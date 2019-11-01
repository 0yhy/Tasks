function* objEntries() {
  let keys = Object.keys(this);
  for(let key of keys) {
    yield [key, this[key]];
  }
}

function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
}
Person.prototype.sayName = function() {
  console.log(this.name);
}

let person1 = new Person("Shaw", 19, "student");
let person2 = new Person("Shaun", 19, "student");

person1[Symbol.iterator] = objEntries;

for(let [key, value] of person1) {
  console.log(`${key}: ${value}`);
}