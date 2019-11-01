function* numbers() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return "ending";
};

/* 
    以下内部方法调用的都为遍历器接口
    因此它们都可以将Generator函数返回的Iterator对象作为参数
 */

//for...of
console.log("for...of");
for(let num of numbers()) {
    console.log(num);
};
//...
console.log("...");
console.log(...numbers());
//解构赋值
console.log("解构赋值")
let [a, b, c] = numbers();
console.log(a, b, c);
//Array.from()方法
console.log("Array.from()");
console.log(Array.from(numbers()));