let fs = require("fs");

let readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if(err) {
        return reject(err);
      }
      resolve(data);
    })
  })
};

let gen = function* () {
  let f1 = yield readFile("files/file.txt");
  let f2 = yield readFile("files/file.txt");
  console.log(f1.toString());
  console.log(f2.toString());
};

//回调函数手动执行
// let g = gen();
// g.next().value.then((data) => {
//   g.next(data).value.then((data) => {
//     g.next(data);
//   })
// })

//手写自动执行器
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if(result.done) {
      return result.value;
    }
    result.value.then((data) => {
      next(data);
    })
  }

  next();
}

run(gen);