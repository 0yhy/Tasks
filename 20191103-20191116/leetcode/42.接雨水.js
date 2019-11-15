//暴力解决
var trap1 = function (heights) {
  let max_left = [];
  let max_right = [];
  let len = heights.length;
  let maxLeft = 0, maxRight = 0;
  let ans = 0;

  for (let i = 0; i < len; ++i) {
    maxLeft = Math.max(maxLeft, heights[i]);
    max_left[i] = maxLeft;
  }
  for (let i = len - 1; i >= 0; --i) {
    maxRight = Math.max(maxRight, heights[i])
    max_right[i] = maxRight;
  }
  for (let i = 0; i < len; ++i) {
    ans += Math.min(max_left[i], max_right[i]) - heights[i];
  }
  return ans;
};

// console.log(trap([2, 0, 2]));

var trap = function (heights) {
  let myStack = [];
  let len = heights.length;
  let ans = 0;
  let cur = 0;
  while (cur < len) {
    while (myStack.length && heights[cur] > heights[myStack[myStack.length - 1]]) {
      let top = myStack.pop();
      // console.log("top:", top);
      if (!myStack.length) {
        // console.log("empty!");
        break;
      }
      let last_index = myStack[myStack.length - 1]
      let distance = cur - last_index - 1;
      let bounded_height = Math.min(heights[cur], heights[last_index]) - heights[top];
      // console.log(last_index, distance, bounded_height);
      ans += distance * bounded_height;
    }
    myStack.push(cur++);
  }
  return ans;
};

// console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));