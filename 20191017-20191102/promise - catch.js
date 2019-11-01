console.log(new Date(), "the code starts to run:");
const promise = new Promise((resolve, reject) => {
  setTimeout(() => { 
    resolve(1027);
    console.log(new Date(), "I create a promise:");
  }, 1000);
});

//在这里第一个then是等到promise状态变化后才开始调用，但是同时调用了所有的then嘛？
promise
  .then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(new Date(), "1：I received a result");
        resolve(result);
      }, 1000);
    });
  })
  .then((result) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(new Date(), "2：I received a result");
        resolve(result);
      }, 1000);
    });
  })
  // .then((result) => {
  //   setTimeout(() => {
  //     console.log(new Date(), "3：I received a result again!");
  //     console.log(result);
  //   }, 1000);
  // })
  .catch((err) => {
    console.log("this is err:", err);
  })
  .finally(() => {
    console.log(new Date(), "done");
  })