function* inner() {
    yield "Hello world";
}
function* outter() {
    yield "Open";
    yield* inner();
    yield "Close";
}
let it = outter();
for(let item of it) {
    console.log(item);
}
