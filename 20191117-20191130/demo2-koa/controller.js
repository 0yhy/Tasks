const fs = require("fs");

function addMapping(router, mapping) {
  for (let url in mapping) {
    if (url.startsWith("GET ")) {
      let path = url.substring(4);
      router.get(path, mapping[url]);
    }
    else if (url.startsWith("POST ")) {
      let path = url.substring(5);
      router.post(path, mapping[url]);
    }
    else {
      console.log("invalid");
    }
  }
};
function addControllers(router, dir) {
  let files = fs.readdirSync(`${__dirname}/${dir}`);
  let js_files = files.filter((file) => {
    return file.endsWith(".js");
  });
  for (let file of js_files) {
    let mapping = require(__dirname + "/" + dir + "/" + file);
    addMapping(router, mapping);
    console.log("mapping:", mapping);
  }
};

module.exports = function (dir) {
  let controllers_dir = dir || "controllers";
  let router = require("koa-router")();
  addControllers(router, controllers_dir);
  return router.routes();
};