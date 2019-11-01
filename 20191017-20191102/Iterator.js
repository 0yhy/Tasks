/* 数组的遍历 */
for(let item of [1, 2, 3, 4, 5]) {
  console.log(item);
}
for(let index in [1, 2, 3, 4, 5]) {
  console.log(index);
}
/* 字符串的遍历 */
for(let c of "zabcde") {
  console.log(c);
}
/* map的遍历 */
var map = new Map();
map.set(0, "zero");
map.set(1, "one");
map.set(2, "two");
//遍历键值对
for (let [key, value] of map) {
  console.log(key + " = " + value);
}
//遍历键
for (let key of map.keys()) {
  console.log(key);
}
//遍历值
for (let value of map.values()) {
  console.log(value);
}
/* Set的遍历 */
let set = new Set();
set.add(1);
set.add(3);
set.add(5);
for(let item of set) {
  console.log(item);
}

/* 对象 */
const arrayLink = { length: 2, 0: "zero", 1: "one"};

for (let item of Array.from(arrayLink)) {
  console.log(item);
}

let myString = "hi";
let iteratorString = myString[Symbol.iterator]();
console.log(iteratorString.next());