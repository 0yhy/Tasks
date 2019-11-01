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
  
  * `resolve`函数的参数还可能是一个`promise`实例
  
    ```javascript
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(new Date());
        reject(new Error("p1 failed!!"));
      }, 2000);
    });
    
    const p2 = new Promise((resolve, reject) => {
      setTimeout(() => resolve(p1), 4000);
    });
    ```
  
    此时，`p1`的状态决定着`p2`的状态
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



### `Promise.prototype.then()`

`then`方法：为`Promise`实例添加状态改变时的回调函数

`then`方法返回的是一个新的`Promise`实例（不是原来的实例），因此可以采用链式写法

### `Promise.prototype.catch()`

* 该方法是`.then(null, reject)`或`then(undefined, reject)`的别名，用于指定发生错误时的回调函数

* 无论是异步操作发生的错误还是`then`方法指定的回调函数抛出的错误，都会被`catch`方法捕获

* 如果没有使用`catch`方法指定错误处理的回调函数，`Promise`对象抛出的错误**不会传递到外层代码**，也就是`Promise`会“吃掉错误”

* `Node`有一个`unhandelRejection`事件，专门监听未捕获的`reject`错误

* ```JavaScript
  const promise = new Promise(function (resolve, reject) {
    resolve('ok');
    setTimeout(function () { throw new Error('test') }, 0)
  });
  promise.then(function (value) { console.log(value) });
  ```

  上述代码再`Promise`运行结束后抛出了一个错误，即是在`Promise`函数体外抛出的，因此会冒泡到最外层被捕获

* `catch`方法返回的也是一个`promise`对象



### `Promise.prototype.finally()`

不管`promise`最后的状态是什么，在执行完`then`或者是`catch`回调函数以后，都会执行`finally`方法指定的回调函数

<!--测了一下，好像在promise状态凝固了以后finally就直接执行了，-->

`finally`方法的回调函数**不接受任何参数**，这意味着没有办法知道，前面的 Promise 状态到底是`fulfilled`还是`rejected`。这表明，`finally`方法里面的操作，应该是与状态无关的，不依赖于 Promise 的执行结果。

`finally`本质上是`then`方法的特例。

### `Promise.protoype.all()`

用于将多个`Promise`实例包装成一个新的`Promise`实例

```javascript
const p = Promise.all([p1, p2, p3]);
```

* 参数：

  * 有`Iterator`接口
  * 返回的每个成员都是`Promise`实例

* 新实例的状态

  * 当所有成员的状态变成`fulfilled`，新实例的状态也会变成`fulfilled`，此时将所有成员的返回值组成一个数组传给新实例的回调函数
  * 当有一个成员的状态为`rejected`，新实例的状态就变成`rejected`，第一个被`reject`的实例的返回值会被传给新实例的回调函数

* 关于`catch`

   如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。 

  ```JavaScript
  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // ["hello", Error: 报错了]
  ```

  上面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数。

  如果`p2`没有自己的`catch`方法，就会调用`Promise.all()`的`catch`方法。

### `Promise.race()`

用于将多个`Promise`实例包装成一个新的`Promise`实例

与`all()`不同的是，只要有一个实例的状态改变了，新实例的状态就会随之改变

接收参数：第一个改变的实例的返回值会被传给`p`的回调函数

### `Promise.allSettled()`

用于将多个`promise`实例包装成一个新的`Promise`实例

当所有的参数实例都返回结果后（无论成功还是失败），新实例才会结束

新实例一旦结束，状态只会是`fulfilled`，不会变成`rejected`

接收参数：

### `Promise.any()`

用于将多个`promise`实例包装成一个新的`Promise`实例

 只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。 

### `Promise.resolve()`

用于将对象转为`Promise`对象

* `Promise`实例

  调用该函数将原封不动地返回实例

* `thenable`对象

  一个具有`then`方法的对象

  * 将对象转成`Promise`对象
  * 立刻执行该对象的`then`方法

* 不具有`then`方法的对象/不是对象

  * 返回一个新的`Promise`对象
  * 新对象状态为`resolved`
  * 参数传给回调函数

* 无参数

  * 直接返回一个状态为`resolved`的`Promise`对象

### `Promise.reject()`

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```

上面代码生成一个 Promise 对象的实例`p`，状态为`rejected`，回调函数会立即执行。

注意，`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。

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

## async函数

即用`async`替换`Generator`函数的`*`，用`await`替换`yield`

* 内置执行器
* 语义清晰
* 适用性更广
  * 在`co`模块中约定`yield`命令后面只能是`Thunk`函数或`Promise`对象
  * `await`命令后可以是`Promise`对象与原始类型的值
* 返回值为`Promise`

### 注意事项

* `await`后的`Promise`结果可能是`rejected`，会导致整个`async`函数终端执行。因此最好将`await`命令放在`try...catch`代码块中

* 多个`await`命令后的异步操作，如果不存在继发关系，最好让他们同时触发

  ```javascript
  let [foo, bar] = await Promise.all([getFoo(), getBar()]);
  ```

  