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