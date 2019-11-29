const fs = require("fs");
const router = require("koa-router")();

function register(mapping) {
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      router.get(url.substring(4), mapping[url]);
    }
    else if (url.startsWith("POST ")) {
      router.post(url.substring(5), mapping[url]);
    }
    else {
      console.log("Invalid URL");
    }
  }
};

function addControllers(dir) {
  let files = fs.readdirSync(`${__dirname}/${dir}`);
  for (let file of files) {
    let mapping = require(`${__dirname}/${dir}/${file}`);
    register(mapping);
  }
};

module.exports = function (dir) {
  let controllers_dir = dir || "controllers";
  addControllers(controllers_dir);
  return router.routes();
};