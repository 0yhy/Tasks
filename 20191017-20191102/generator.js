//将Generator赋值给对象的Symbol.iterator属性，从而使得该对象具有Iterator接口
//从而可以被...运算符遍历
let myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    return "ending";
}
console.log([...myIterable]);

//Generator函数执行后返回一个遍历器对象
//该对象本身具有Symbol.iterator属性
//执行后返回本身
function* gen() {
    yield 1;
    yield 2;
};
var g = gen();
// console.log(g[Symbol.iterator]() === g);
for(let i of g) {
    console.log(i);
}

function* f() {
    for (let i = 0; true; i++) {
        let reset = yield i;
        if(reset) {
            i = -1;
        }
    }
}
var fIterable = f();
console.log(fIterable.next());
console.log(fIterable.next());
console.log(fIterable.next());
console.log(fIterable.next());
console.log(fIterable.next(true));//将reset的值设置为true

//为原生对象添加Iterator接口，使用for...of遍历
let person = {name:"Shaw", age:19};
function* objEntries() {
    let propKeys = Object.keys(this);
    for(let propKey of propKeys) {
        yield[propKey, this[propKey]];
    }
}
//方法一：
// for(let [key, value] of objEntries(person)) {
//     console.log(`${key}: ${value}`);
// }
//方法二：
person[Symbol.iterator] = objEntries;
for(let [key, value] of person) {
    console.log(`${key}: ${value}`);
}