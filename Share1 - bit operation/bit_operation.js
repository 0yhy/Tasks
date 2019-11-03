function add (a, b) {
  if (b == 0) {
    console.log(a);
  }
  else {
    let tmp = a;
    a = a ^ b;
    b = (tmp & b) << 1;
    add(a, b);
  }
};
add(1, 3);

function isIntegerPowerOf2 (x) {
  return !(x & (x - 1));
};

function numberOccurredOddTimes (arr) {
  let res = 0;
  for (let num of arr) {
    res ^= num;
  }
  return res;
};
console.log(numberOccurredOddTimes([1, 2, 3, 4, 5, 5, 4, 4, 4, 2, 1, 3, 3]));