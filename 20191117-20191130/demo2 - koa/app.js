const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const controller = require("./controller");

const app = new Koa();

app.use(bodyParser());

app.use(controller());

app.listen(1205);
console.log("http://localhost:1205");