const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2");
  }, 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3");
  }, 3000);
});
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p4");
  }, 1000);
});
const p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p5");
  }, 2000);
});
const p6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("p6");
  }, 3000);
});

console.log(new Date(), "Start!");

/* all()方法 */
//传入实例均为resolved
const promiseAll1 = Promise.all([p1, p2, p3]);
promiseAll1
  .then((result) => {
    console.log("all:\t", new Date());
    console.log(result);//["p1", "p2", "p3"]
})
//传入实例中有一个为rejected
const promiseAll2 = Promise.all([p1, p4, p5]);
promiseAll2
  .then((result) => {
    console.log("all:\t", new Date());
    console.log(result);
  })
  .catch((err) => {
    console.log("all:\t", new Date());
    console.log(err);//输出第一个被reject的实例的返回值
  })

/* any方法 */
// const promiseAny1 = Promise.any([p4, p5, p6]);
// promiseAny1
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

/* race()方法 */
const promiseRace1 = Promise.race([p1, p2, p3, p4, p5, p6]);
promiseRace1
  .then((result) => {
    console.log("race:\t", new Date());
    console.log(result);
  })
  .catch((err) => {
    console.log("race:\t", new Date());
    console.log(err);
  })

/* allSettled方法 */
const promiseAllSettled1 = Promise.allSettled([p1, p2, p3, p4, p5, p6]);
promiseAllSettled1
  .then((result) => {
    console.log("allsettled:\t", new Date());
    console.log(result);
  })