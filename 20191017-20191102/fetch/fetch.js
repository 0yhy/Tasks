/* 
    input:  可能是：
            一个USVString字符串，包含要获取资源的URL
            一个Request对象
    init:   
            可选参数
            一个配置顶对象
    返回值： 
            一个promise对象
            resolve时传回Response对象  
 */

function fetch(input, init) {
  return new Promise((resolve, reject) => {

  })
};

/*
------------------------------Headers----------------------------------
    Headers.append()方法:
      添加到Headers的头列表
    Headers.delete()方法：
      从Headers对象中删除指定Header
    Headers.entries()方法：
      以 迭代器 的形式返回Headers对象中所有的键值对
    Headers.get()
      以 ByteString 的形式从Headers对象中返回指定header的全部值.
    Headers.has()
      以布尔值的形式从Headers对象中返回是否存在指定的header.
    Headers.keys()
      以迭代器的形式返回Headers对象中所有存在的header名.
    Headers.set()
      替换现有的header的值, 或者添加一个未存在的header并赋值.
    Headers.values()
      以迭代器的形式返回Headers对象中所有存在的header的值.
    Headers对象可使用for...of结构（这意味着部署了遍历器接口）
*/

function Headers(headers) {
  this.list = {};

  if (headers instanceof Headers) {
    for(let [name, value] of headers) {
      this.append(name, value);
    }
  }
};
//append
Headers.prototype.append = function(name, value) {
  let oldValue = this.list[name];
  this.list[name] = oldValue ? oldValue + ', ' + value : value;
};

//delete
Headers.prototype.delete = function(name) {
  delete this.list[name];
};

//entries
Headers.prototype.entries = function* () {
  let keys = Object.keys(this.list);
  for(let key of keys) {
    yield [key, this.list[key]];
  }
};
Headers.prototype[Symbol.iterator] = Headers.prototype.entries;

//get
Headers.prototype.get = function(name) {
  return this.has(name) ? this.list[name] : null;
};

//has
Headers.prototype.has = function(name) {
  return this.list.hasOwnProperty(name);
};

//keys
Headers.prototype.keys = function* () {
  let keys = Object.keys(this.list);
  for(let key of keys) {
    yield [key];
  }
};

//values
Headers.prototype.values = function* () {
  let keys = Object.keys(this.list);
  for(let key of keys) {
    yield [this.list[key]];
  }
};

var header = new Headers();
header.append("name", "Shaw");
console.log(header);
header.delete("name");
console.log(header);
header.append("name", "Shaw");
header.append("age", "19");
header.append("name", "Shaun");
console.log(header);
for(let [name, value] of header) {
  console.log(name, value);
}
console.log(header.get("name"));

var newHeader = new Headers(header);
console.log(newHeader);


/*
------------------------------Body----------------------------------
    ------------------属性-------------------
    Body.body 
      一个简单的getter用于暴露一个ReadableStream类型的主体内容。
    Body.bodyUsed 
      一个Boolean 值指示是否body已经被标记读取。
 */

function Body() {
};


/*
------------------------------Request----------------------------------
参数1：Request对象或USVString字符串
参数2：可选参数；Request对象
*/
function Request(input, RequestInit) {
  RequestInit = RequestInit || {};
  let body = RequestInit.body || null;

  if (input instanceof Request) {
    this.url = input.url;
    this.credentials = input.credentials;
  }
};