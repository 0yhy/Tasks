# Node.js

> node是什么？能干嘛？

简单来说，Node.js就是运行在服务端的JavaScript

js代码写好后，我们可以直接通过软件解析运行

Node.js是JavaScript的运行环境，可以解析JavaScript代码

作用：我们可以直接通过js写项目（接口、爬虫、桌面应用、聊天系统等）

## npm

* 查看npm版本

  `npm -v`

## 模块

在计算机程序的开发过程中，随着程序代码越写越多，在一个文件里代码就会越来越长，越来越不容易维护。

为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。在Node环境中，一个.js文件就称之为一个模块（module）。

在node.js中，各个模块可以使用相同的变量名和函数名

一个`js`文件就是一个模块，模块名是**文件名去掉后缀**

* 导出模块

  ```javascript
  module.exports = greet;
  ```

* 导入模块

  ```javascript
  var greet = require("./hello")
  ```

  在使用`require()`引入模块时，注意模块的相对路径

### `module.exports`、`exports`的区别

>  "exports is assigned the value of module.exports before the module is evaluated." 

1. `exports`是`module.exports`的一个引用，`exports`指向的是`module.exports`
2. `mdoule.exports`初始化为一个空对象
3. `require()`返回的时**`module.exports`而不是`exports`**

知道以上三点后我们可以知道：

当给`exports`对象添加属性时，我们同时也操作了`module.exports`，是可行的；

```javascript
exports.a = function(){};
```

当给`exports`对象赋值时，断开了`exports`与`module.exports`的连接，`moudle.exports`仍然是空对象，这时就无效了

```javascript
exports = {
  a: a,
  b: b
}
```

因此建议，无论何时都使用`module.exports`的形式导出模块

## 基本模块

### fs

文件系统模块，负责读写文件

该模块同时提供**异步和同步**的方法

#### 异步读文件

```javascript
//读文件时要加第二个参数：编码(可选参数)
//否则会输出原始的buffer
fs.readFile("sample.txt", "utf8", function(err, data) {
  if(err) {
    console.log(err);
  }
  else {
    console.log(data);
  }
})
```

* 读取**二进制文件**

  ```javascript
  var fs = require('fs');
  
  fs.readFile('sample.png', function (err, data) {
      if (err) {
          console.log(err);
      } 
      else {
          console.log(data);
          console.log(data.length + ' bytes');
      }
  });
  ```

  当读取二进制文件时，不传入文件编码时，回调函数的`data`参数将返回一个`Buffer`对象。在`Node.js`中，`Buffer`对象就是一个包含零个或任意个字节的数组（注意和Array不同）。

  `Buffer`对象可以和`String`作转换：

  * `Buffer`对象转`String`：

    ```javascript
    var text = data.toString("utf-8");
    console.log(text)
    ```

  * `String`转`Buffer`

    ```javascript
    var buf = Buffer.from(text, "utf-8");
    ```

#### 同步读文件

```javascript
var data = fs.readFileSync("sample.txt", "utf-8");
console.log(data);
```

无回调函数；有错误用`try...catch`捕获

#### 异步写文件

```JavaScript
var data = 'Hello, Node.js';
fs.writeFile('output.txt', data, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('ok.');
    }
});
```

#### 同步写文件

```JavaScript
var data = 'Hello, Node.js';
fs.writeFileSync('output.txt', data);
```

#### 获取文件信息

如果我们要获取文件大小、创建时间等信息，使用`fs.stat()`，其返回值为一个`Stat`对象

```javascript
fs.stat("sample.txt", function(err, stat) {
  if(err) {
  	console.log(err);
  }
  else {
  	console.log(`isFile: ${stat.isFile()}`);
  	console.log(`isDir: ${stat.isDirectory()}`);
  }
  if(stat.isFile()) {
      console.log(stat.size, stat.birthtime, stat.mtime);
  }
})
```



### stream

我们可以把数据看成是 数据流。

当我们敲键盘时，每个字符依次连起来，这个流从键盘输入到应用程序，它也被称作**标准输入流`stdin`**

如果应用程序把字符一个一个输出到显示器上，这就是**标准输出流`stdout`**

在`Node.js`中，**流也是一个对象**

* `data`事件表示流的数据已经可以读取了
* `end`事件表示这个流已经到了末尾，没有数据可以提取
* `error`事件表示出错了

```javascript
let fs = require("fs");
let rs = fs.createReadStream("sample.txt", "utf-8");

rs.on("data", function(chunk) {
  console.log(chunk);
});
rs.on("end", function() {
  console.log("End");
});
rs.on("error", function(err) {
  console.log("Err:" + err);
});
```

#### 以流的形式写入文件

```javascript
let fs = require("fs");

let ws1 = fs.createWriteStream("output1.txt", "utf-8");
ws1.write("使用Stream写入文本数据\n");
ws1.write("heihei");
ws1.end();

let ws2 = fs.createWriteStream("output2.txt", "utf-8");
ws2.write(new Buffer("使用Stream写入二进制数据\n", "utf-8"));
ws2.write(new Buffer("End", "utf-8"));
ws2.end();
```

 所有可以读取数据的流都继承自`stream.Readable`，所有可以写入的流都继承自`stream.Writable`。 

#### `pipe`

就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个`Readable`流和一个`Writable`流串起来后，所有的数据自动从`Readable`流进入`Writable`流，这种操作叫`pipe`。

在Node.js中，`Readable`流有一个`pipe()`方法。

让我们用`pipe()`把一个文件流和另一个文件流串起来，这样源文件的所有数据就自动写入到目标文件里了，所以，这实际上是一个复制文件的程序：

```JavaScript
var fs = require('fs');

var rs = fs.createReadStream('sample.txt');
var ws = fs.createWriteStream('copied.txt');

rs.pipe(ws);
```

默认情况下，当`Readable`流的数据读取完毕，`end`事件触发后，将自动关闭`Writable`流。如果我们不希望自动关闭`Writable`流，需要传入参数：

```JavaScript
readable.pipe(writable, { end: false });
```

### http

传统的HTTP服务器会由Aphche、Nginx、IIS之类的软件来担任，但是nodejs并不需要

**nodejs提供了http模块，自身就可以用来构建服务器**

而且http模块是由C++实现的，性能可靠。

#### 创建一个服务器

```JavaScript
const http = require("http");

let server = http.createServer(function (request, response) {
  // 输出请求method和url
  console.log(request.method + ":" + request.url);
  // 将HTTP响应200写入response，设置content-type
  response.writeHead(200, { "Content-Type": "text/html" });
  // 将HTTP相应内容写入response
  response.end("<h1>Hello world!</h1>")
});

server.listen(1027);
console.log("Server is running at http://127.0.0.1:1027");

```

#### 文件服务器

 我们可以设定一个目录，然后让Web程序变成一个文件服务器

实现：

1. 解析`request.url`中的路径
2. 在本地找到对应的文件
3. 把文件内容发送出去

#####  `path`

* `path.resolve([...paths])`

  > The `path.resolve()` method resolves a sequence of paths or path segments into an absolute path. 

  将路径或路径片段的序列解析为绝对路径

* `path.join([...paths])`

  >  The `path.join()` method joins all given `path` segments together using the platform-specific separator as a delimiter, then normalizes the resulting path. 

  将路径片段使用特定的分隔符连接起来形成路径，直接拼接字段

* `path.parse()`

  > The `path.parse()` method returns an object whose **properties represent significant elements** of the `path`. Trailing directory separators are ignored, see [`path.sep`](https://nodejs.org/dist/latest-v12.x/docs/api/path.html#path_path_sep).
  >
  > The returned object will have the following properties:
  >
  > - `dir` 
  > - `root`
  > - `base` 
  > - `name` 
  > - `ext` 

##### `url`

* `url.parse()`

  >  The `url.parse()` method takes a URL string, parses it, and returns a URL object. 

##### MIME

多用途Internet邮件扩展（MIME）类型是一种用标准化的方式来表示文档的**性质**和**格式**。即浏览器通过MIME类型来确定如何处理文档

在服务器中，我们通过设置`Content-Type`这个响应头部的值，来指示相应回去的资源的MIME类型。

在`node`中，我们通过响应对象的`writeHead()`方法来设置**响应状态码**和**响应头部**

## 媒体流：Media Stream

 **`MediaStream`** 接口是一个媒体内容的流.。一个流包含几个*轨道*，比如视频和音频轨道。 

## Demo: 静态资源服务

### 处理`markdown`

1. 判断后缀名

2. 如果后缀名为`.md`，写入头部`"Content-Type": "text/html; charset=utf-8"`

   **一定要注意编码，之前没有写一直是乱码**

3. 使用`marked`模块将类型为`String`的`markdown`转换为`html`并写入`response`

### 处理视频、音频与图像

使用上述`stream`中的内容进行处理

不可行的文件格式：`avi`、`flv`、`wma`

#### 问题：无法快进/快退

参考问题： https://stackoverflow.com/questions/53939920/fast-forward-and-rewind-is-not-working-in-nodejs-server 

参考文章： https://websnippet.io/post/video-streaming-with-nodejs/ 

使用`fs.createReadStream`读取`video`文件可以以`stream`的形式读取视频文件，而不是一次性全部读取完。