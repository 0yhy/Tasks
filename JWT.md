# JWT: JSON Web Token

## 从身份验证说起

### HTTP：无状态协议

很久以前Web 基本上就是文档的浏览而已。 既然是浏览，一个服务器， 为什么要记住谁在一段时间里都浏览了什么文档呢？每次请求都是一个新的HTTP协议，完全不需要记住是谁刚刚发了HTTP请求

### 管理会话

随着交互式的web应用开始兴起（论坛、在线购物网站等），服务器就必须要记住是哪些人登陆了系统，哪些人在自己的购物车里加了东西。要能够识别每个人——这就有了管理会话的需求。

### 会话标识：session id

解决方案之一：给每个人发一个**会话标识**，这个标识是一个随机的字符串，每个人收到的不一样。

每次大家向服务器发起HTTP请求时，将这个字符串一并发送，服务器便能区分谁是谁。

### 跨域身份验证

1. 用户向服务器发送用户名和密码。
2. 服务器验证通过后，在当前对话（session）里面保存相关数据，比如用户角色、登录时间等等。
3. 服务器向用户返回一个 session_id，写入用户的 Cookie。
4. 用户随后的每一次请求，都会通过 Cookie，将 session_id 传回服务器。
5. 服务器收到 session_id，找到前期保存的数据，由此得知用户的身份。



问题：巨大的开销



## Token

Token（令牌）是在服务端产生的。

1. 客户端使用用户名/密码向服务端请求认证
2. 如果服务端认证成功，那么在服务端会返回一个签名的 token 给前端。
3. 客户端存储 token，并在每次发送请求时携带
4. 服务器端解密，判断token是否有效

![img](https://upload-images.jianshu.io/upload_images/3297464-877332de2216179a.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

### 怎样实现签名？

> 数字签名：只有信息的发送者才能产生的、别人无法伪造的一段字符串

### 时间换空间

session：存储大量的session id

token：生成token、验证token



## JWT

跨域身份验证的规范

JSON Web Tokens由dot（.）分隔的三个部分组成，它们是：

- Header（头部）
- Payload（负载）
- Signature（签名）

```
JWT = Base64(Header) + "." + Base64(Payload) + "." + $Signature
```

因此，JWT通常如下展示：**xxxxx.yyyyy.zzzz**

### Header

头部用于描述关于该 JWT 的最基本的信息，例如其类型以及签名所用的算法等。

```json
{
  "alg": "HS256", // 表示签名的算法，默认是 HMAC SHA256（写成 HS256）
  "typ": "JWT"  // 表示Token的类型，JWT 令牌统一写为JWT
}
```

该JSON对象要使用 Base64URL 算法转换为字符串保存。

### Payload

负载用于存放实际需要传递的数据。

* JWT指定七个默认字段供选择。

```json
{
  "iss": 发行人,
  "exp": 到期时间,
  "sub": 主题,
  "aud": 用户,
  "nbf": 在此之前不可用,
  "iat": 发布时间,
  "jti": JWT ID用于标识该JWT,
}
```

* 除以上默认字段外，我们还可以自定义私有字段，如

```json
{
  "sub": "1234567890",
  "name": "shaw",
  "admin": true
}
```

请注意，默认情况下JWT是未加密的，任何人都可以解读其内容，因此不要构建隐私信息字段，存放保密信息，以防止信息泄露。

该JSON对象也使用 Base64URL 算法转换为字符串保存。

### Signature

对前两部分的签名，防止数据被篡改。

* Base64URL 后的Header
* Base64URL 后的Payload
* Secret（密钥）

首先，需要指定一个密钥(secret)。这个密钥只有服务器才知道，不能泄露给用户。然后，使用Header里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名：

```
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

