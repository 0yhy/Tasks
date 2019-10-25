function hello() {
    var extend = "hello there";
    with(extend) {
        var extend = "this is me"
        console.log();
    }
}

hello();