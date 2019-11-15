let outside = document.querySelector(".outside");
let inside = document.querySelector(".inside");
console.log(outside, inside);

outside.onmouseover = () => {
  console.log("mouseOverMe!");
};
outside.onmouseout = () => {
  console.log("mouseOutMe!");
};
outside.onmouseenter = () => {
  console.log("mouseEnterMe!");
};
outside.onmouseleave = () => {
  console.log("mouseLeaveMe!");
};