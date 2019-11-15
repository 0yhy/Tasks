let p1 = document.getElementById("p1");
let helloNode = p1.firstChild.firstChild;
let worldNode = p1.lastChild;
let range = document.createRange();
// range.setStart(helloNode, 2);
// range.setEnd(worldNode, 3);
range.selectNode(helloNode);

let span = document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span);