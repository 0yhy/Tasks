// 导入的Koa是一个class
const Koa = require("koa");
// 返回值为函数 因为它是一个middleware
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");

// 创建一个Koa对象来表示web app本身
const app = new Koa();


app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}`)
  await next();
});

app.use(bodyParser());

app.use(controller());

app.listen(1205);
console.log("http://localhost:1205");


