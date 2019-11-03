function add (a, b) {
  if (b == 0) {
    console.log(a);
  }
  else {
    tmp = a;
    a = a ^ b;
    b = (tmp & b) << 1;
    add(a, b);
  }
}
add(5, 120394);


// import fetch from "./fetch";
// fetch("https://find-club.dev.hustonline.net/api/v1/club/all")
//   .then((result) => {
//     console.log(result);
//   })import fetch from ".fetch" {}