console.log(new Date(), "Start")
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

async function asyncPrint(value, ms) {
  await(timeout(ms));
  console.log(new Date(), value);
}

asyncPrint("Hello world", 3000);