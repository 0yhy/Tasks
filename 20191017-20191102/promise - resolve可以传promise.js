const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(new Date());
    reject(new Error("p1 failed!!"));
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(p1), 4000);
});

p2
  .then((result) => console.log(result))
  .catch((error) => console.log(error, new Date()))