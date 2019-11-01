const p1 = new Promise((resolve, reject) => {
  console.log(new Date(), "I created a promise");
  setTimeout(() => {
    console.log(new Date(), "I resolved 10")
    resolve(10);
  }, 1000);
});

p1
  .then(() => {
    setTimeout(() => {
      console.log(new Date(), "delay some time");
    }, 1000);
  })
  .then((val) => {
    console.log(new Date(), "I received 10");
    console.log(val);
  })
  .then(() => {
    setTimeout(() => {
      console.log(new Date(), "The previous promise has changed");
    }, 1000);
  })