window.onload = () => {
  let div = document.getElementById("myDiv");
  div.oncontextmenu = (event) => {
    event.preventDefault();
    let menu = document.getElementById("myMenu");
    menu.style.left = event.clientX + "px";
    menu.style.top = event.clientY + "px";
    menu.style.visibility = "visible";
  }
  document.onclick = () => {
    document.getElementById("myMenu").style.visibility = "hidden";
  }
}