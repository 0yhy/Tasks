var global = function() {
  return this;
}();
global.color = "red";
var o = {color:"blue"};

function sayColor() {
  console.log(this.color);
}
sayColor();
o.sayColor = sayColor;
// o.sayColor();
sayColor.call(o);