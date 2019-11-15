document.onmousewheel = function () {
  console.log(event.wheelDelta);
};

document.onkeydown = function () {
  console.log(event.keyCode, event.key);
};

document.onkeypress = function () {
  console.log(event.charCode);
};