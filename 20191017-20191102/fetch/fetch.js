let support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  // 二进制大对象，是一个可以存储二进制文件的“容器”。
  // 在计算机中，BLOB常常是数据库中用来存储二进制文件的字段类型。
  // BLOB是一个大文件，典型的BLOB是一张图片或一个声音文件，由于它们的尺寸，必须使用特殊的方式来处理
  blob:
    'FileReader' in self &&
    'Blob' in self &&
    (function () {
      try {
        new Blob()
        return true;
      }
      catch (e) {
        return false;
      }
    })(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self//二进制数据存储
};
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

function fetch (input, init) {
  return new Promise((resolve, reject) => {
    let request = new Request(input, init);

    let xhr = new XMLHttpRequest();

    //请求成功，构建Response
    xhr.onload = function () {
      //取出response中的 status headers body来封装Response对象
      let ResponseInit = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders() || ""
      }
      RequestInit.url = "responseURL" in xhr ? xhr.responseURL : RequestInit.headers.get("X-Request-URL");
      let body = "response" in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, ResponseInit));
    };

    //请求失败，构建Error
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    //请求超时，构建Error
    xhr.ontimeout = function () {
      reject(new TypeError("Network request failed"));
    };
    //初始化请求
    xhr.open(request.method, request.url, true);
    //设置header
    for (let [name, value] of request.headers) {
      xhr.setRequestHeader(name, value);
    }
    //设置credentials
    if (request.credentials === "include") {
      xhr.withCredentials = true;
    }
    else if (request.credentials === "omit") {
      xhr.withCredentials = false;
    }
    //设置responseType
    if ("responseType" in xhr && support.blob) {
      xhr.responseType = "blob";
    }
    //发送请求
    xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
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

function Headers (headers) {
  this.list = {};

  if (headers instanceof Headers) {
    for (let [name, value] of headers) {
      this.append(name, value);
    }
  }
};
//append
Headers.prototype.append = function (name, value) {
  let oldValue = this.list[name];
  this.list[name] = oldValue ? oldValue + ', ' + value : value;
};

//delete
Headers.prototype.delete = function (name) {
  delete this.list[name];
};

//entries
Headers.prototype.entries = function* () {
  let keys = Object.keys(this.list);
  for (let key of keys) {
    yield [key, this.list[key]];
  }
};
if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

//get
Headers.prototype.get = function (name) {
  return this.has(name) ? this.list[name] : null;
};

//has
Headers.prototype.has = function (name) {
  return this.list.hasOwnProperty(name);
};

//keys
Headers.prototype.keys = function* () {
  let keys = Object.keys(this.list);
  for (let key of keys) {
    yield [key];
  }
};

//values
Headers.prototype.values = function* () {
  let keys = Object.keys(this.list);
  for (let key of keys) {
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
for (let [name, value] of header) {
  console.log(name, value);
}
console.log(header.get("name"));

var newHeader = new Headers(header);
console.log(newHeader);


/*
------------------------------Body----------------------------------
    Body方法和属性也存在于Request和Response的原型上（继承）
    ------------------属性-------------------
    Body.body 
      一个简单的getter用于暴露一个ReadableStream类型的主体内容。
    Body.bodyUsed 
      一个Boolean 值指示是否body已经被标记读取。
 */
//body是否读取过
function consumed (body) {
  if (body.bodyUsed) {
    return new Promise((resolve, reject) => {
      reject(new TypeError("Already read"));
    });
  }
  body.bodyUsed = true;
}

function Body () {
  this.bodyUsed = false

  this._initBody = function (body) {
    // 把最原始的数据存下来
    this._bodyInit = body
    // 判断body数据类型，然后存下来
    if (!body) {
      this._bodyText = ''
    }
    else if (typeof body === 'string') {
      this._bodyText = body
    }
    else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body
    }
    else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body
    }
    else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString()   //数据格式是这样的 a=1&b=2&c=3
    }
    else if (support.arrayBuffer && support.blob && isDataView(body)) {
      // ArrayBuffer一般是通过DataView或者各种Float32Array,Uint8Array来操作的
      // 如果是DataView， DataView的数据是存在 DataView.buffer上的
      this._bodyArrayBuffer = bufferClone(body.buffer)  // 复制ArrayBuffer
      // IE 10-11 can't handle a DataView body.
      this._bodyInit = new Blob([this._bodyArrayBuffer]) // 重新设置_bodyInt
    }
    else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      // ArrayBuffer一般是通过DataView或者各种Float32Array,Uint8Array来操作的， 
      this._bodyArrayBuffer = bufferClone(body)
    }
    else {
      throw new Error('unsupported BodyInit type')
    }

    // 设置content-type
    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8')
      }
      else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type)
      }
      else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
      }
    }
  }

  if (support.blob) {
    // 使用 fetch(...).then(res=>res.blob())
    this.blob = function () {
      //标记为已经使用
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      // resolve，进入then
      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob)
      }
      else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]))
      }
      else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob')
      }
      else {
        return Promise.resolve(new Blob([this._bodyText]))
      }
    }
    // 使用 fetch(...).then(res=>res.arrayBuffer())
    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
      }
      else {
        return this.blob().then(readBlobAsArrayBuffer) //如果有blob，读取成ArrayBuffer
      }
    }
  }

  // 使用 fetch(...).then(res=>res.text())
  this.text = function () {
    var rejected = consumed(this)
    if (rejected) {
      return rejected
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob)
    }
    else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text')
    } else {
      return Promise.resolve(this._bodyText)
    }
  }

  // 使用 fetch(...).then(res=>res.formData())
  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode)
    }
  }

  // 使用 fetch(...).then(res=>res.json())
  this.json = function () {
    return this.text().then(JSON.parse)
  }

  return this
}



/*
------------------------------Request----------------------------------
  input:
      一个 USVString 包含要获取资源的直接URL
      一个Request对象 有效的创建一个副本
  RequestInit:包含要应用于任何请求的任何自定义设置的选项对象

*/
function Request (input, RequestInit) {
  RequestInit = RequestInit || {};
  let body = RequestInit.body;
  //如果 input 是一个 Request 对象：
  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError("Already read");
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!RequestInit.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;//some-orgin, cors, no-cors
    //标记Request已经被用过
    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  }
  else {
    this.url = String(input);
  }

  this.credentials = RequestInit.credentials || this.credentials || "omit";
  if (RequestInit.headers || !this.headers) {
    this.headers = new Headers(RequestInit.headers);
  }
  this.method = RequestInit.method || this.method || "GET";
  this.mode = RequestInit.mode || this.mode || null;
  this.referrer = null;//请求源地址

  if (this.method === "GET" || this.method === "HEAD") {
    throw new TypeError("Body not allowed for GET or HEAD Request");
  }
  this._initBody(body);
};
//clone
Request.prototype.clone = function () {
  return new Request(this, { body: this._bodyInit });
}

/*
------------------------------Request----------------------------------

*/

function Response (bodyInit, ResponseInit) {
  if (!ResponseInit) {
    ResponseInit = {};
  }

  this.type = "default";
  this.status = ResponseInit.status === undefined ? 200 : ResponseInit.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = "statusText" in ResponseInit ? ResponseInit.statusText : "OK";
  this.headers = new Headers(ResponseInit.headers);
  this.url = ResponseInit.url || "";
  this._initBody(bodyInit);
}

Body.call(Response.prototype)

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  })
}

Response.error = function () {
  var response = new Response(null, { status: 0, statusText: "" })
  response.type = 'error';
  return response;
}

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, { status: status, headers: { location: url } });
}

