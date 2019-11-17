let cnt = 0;
// document.onmousemove = function () {
//   document.querySelector(".cnt").innerHTML = cnt++;
// };

function renderCnt() {
  document.querySelector(".cnt").innerHTML = cnt++;
};

function debounce(func, wait) {
  let timeout;
  return function () {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(this, arguments);
    }, wait);
  }
};

function throttle(func, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    if (now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

document.onmousemove = debounce(renderCnt, 200);