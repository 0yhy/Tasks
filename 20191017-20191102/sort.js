var a = [1, 3, 10, 56, 1027, 512];

function compare(val1, val2) {
  if (val1 < val2) {
    return -1;
  }
  else if (val1 === val2) {
    return 0;
  }
  else {
    return 1;
  }
}

console.log(a.sort());
console.log(a.sort(compare));