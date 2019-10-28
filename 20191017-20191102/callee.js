function factorial(num) {
  if (num <= 1) {
    return 1;
  }
  else {
    return num * arguments.callee(num - 1);
  }
}

var newFactorial = factorial;

console.log(newFactorial(10));