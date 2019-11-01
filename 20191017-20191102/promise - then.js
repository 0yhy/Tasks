const p1 = new Promise((resolve, reject) => {
  console.log(new Date(), "1. I created a promise");
  setTimeout(() => {
    console.log(new Date(), "2. I resolved 10")
    resolve(10);
  }, 1000);
});

p1
  .then((val) => {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //   resolve(val);
    //   console.log(new Date(), "3. delay some time");
    // }, 1000);});
    setTimeout(() => {
      console.log(new Date(), "3. delay some time");
    }, 1000);
  })
  .then((val) => {
    console.log(new Date(), "4. I received 10");
    console.log(val);
  })
  .then(() => {
    setTimeout(() => {
      console.log(new Date(), "5. The previous promise has changed");
    }, 1000);
  })