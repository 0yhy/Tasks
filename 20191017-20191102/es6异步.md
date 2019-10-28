# 原生Ajax封装——实现浏览器`fetch-api`

## 怎样理解同步/异步

* 单线程

  * JavaScript是单线程的，即在JS引擎中负责**解释和执行**JavaScript代码的线程只有一个
  * 一次只能完成一个任务，如果有多个任务必须排队，依次执行

  >  如果前面的任务卡死/执行时间较长，后面的任务都得排队等着，会导致延迟整个程序的执行
  >
  > 为了解决这个问题，JavaScript将任务的执行模式分为了两种：同步任务与异步任务

* 浏览器线程

  一个浏览器通常包含以下常驻线程：

  * JS引擎线程：负责JS的解析和执行

  - 渲染引擎线程 ：负责页面渲染
  - 定时触发器线程：处理定时事件
  - 事件触发线程：处理DOM事件
  - 异步HTTP请求线程：处理HTTP请求

  虽然JavaScript是单线程的，但浏览器内部不是单线程的。

  一些I/O操作、定时器的计时和事件监听等都是由浏览器提供的其他线程来完成的

* 异步运行机制

  > 单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。如果排队是因为计算量大，CPU忙不过来，倒也算了。但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。于是JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，**挂起处于等待中的任务**，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。
  >
  > 在浏览器端，耗时较长的操作都应该异步执行，避免浏览器失去响应

  * 主线程执行**栈**
    * 存储同步任务，即能立即执行、不耗时的任务
  * 事件/消息/任务**队列**
    * 每当一个异步任务有了响应，就向任务队列中放置一个事件（表示相关任务排队等待进入主线程执行栈）



**异步运行机制** 

1. **所有同步任务在主线程（执行栈）上顺次执行**
2. **异步任务发出调用后马上返回，但不会马上返回预期结果。调用者不必主动等待结果，当异步任务有响应后，会向任务队列中放置一个事件**
3. **一旦执行栈中的所有同步任务执行完毕，即栈为空时，系统就会读取任务队列。处于等待状态的异步任务被读取，其回调函数（也就是被主线程挂起的代码）进入执行栈，单线程开始执行新的同步任务**
4. **主线程不断重复第三步，这个过程叫事件循环**



## es6异步

### Promise对象

异步编程的传统解决方案：使用回调函数和事件

后来在社区中提出了更好的实现方案，也就是`Promise`对象。

ES6将其写入了语言标准，原生提供了`Promise`对象

* `Promise`是什么

  * 一个容器，存放着某个未来才会结束的事件
  * 一个对象，我们可以通过它获取异步操作的消息

* `Promise`状态

  * 进行中：`pending`
  * 已成功：`fulfilled`
  * 已失败：`rejected`

* 对象特点

  * 对象状态**不受外界影响**：对象状态只由异步操作的结果决定

  * 一旦状态改变，这个状态就不会再变化。

    状态的变化只有两种可能：

    * 从`pending`变为`fulfilled`
    * 从`pending`变为`rejected`

    改变后的状态称为`resolved`（已定型），任何时候都能得到这个结果

  > 很多时候我们说`resolved`状态时，实际上说的是`fulfilled`状态

* `Promise`解决了什么？
  * 可以将异步操作以同步操作的流程表示出来，避免嵌套的回调函数
  * 统一的接口，控制异步操作更容易



### 基本用法

创造`Promise`实例

```JavaScript
const promise = new Promise(function(resolve, reject) {
   //Promise构造函数接受一个函数作为参数，该函数接收两个参数
   //这两个参数由JS引擎提供，无需自己部署 
   if(/* 异步操作成功 */) {
     resolve(value);
   }
   else {
     reject(error);
   }
})
```

* `resolve`：
  * 将`Promise`对象状态由`pending`变为`fulfilled`
  * 将异步操作的结果**作为参数传出** 
* `reject`：
  * 将`Promise`对象状态由`pending`变为`rejected`
  * 将异步操作的报错**作为参数传出**



`then`方法

```JavaScript
//then方法接受两个回调函数作为参数
promise.then(function(value) {
  //第一个回调函数在对象状态变为resolved时调用
}, function(error) {
  //第二个回调函数在对象状态变为rejected时调用
  //可选参数
})
```

两个函数接收的参数均为`Promise`对象**传出的值**

其中，第二个函数是可选的





## Iterator和for...of循环

### Iterator的概念

* JavaScript表示“集合”的数据结构
  * Array
  * Object
  * Map
  * Set

  我们需要一种统一的接口机制来处理不同的数据结构，因此就出现了遍历器`Iterator`

* Iterator如何遍历

  * 创建一个**指针对象**，指向当前数据结构的起始位置
  * 第一次调用指针对象的`next`方法，可以将指针指向数据结构的第一个成员
  * 每次调用该指针对象的`next`的方法，都可以将指针指向数据结构的下一个成员
  * 当指针对象指向数据结构的结束位置，遍历结束

* `next`方法的返回值

  * `value`：当前成员的值
  * `done`：布尔值，表示遍历是否结束

* 迭代过程

  * 通过`Symbol.iterator`创建一个迭代器，指向当前数据结构起始位置
  * 通过`next`方法进行向下迭代

  ```javascript
  const items = ["zero", "one", "two"];
  const it = items[Symbol.iterator]();
  console.log(it.next());
  ```


* 可使用`for...of`循环迭代的数据结构

  * Array
  * String
  * Map
  * Set
  * DOM元素

  ```JavaScript
  /* 数组的遍历 */
  for(let item of [1, 2, 3, 4, 5]) {
      console.log(item);
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
  ```


