const url = "https://byupick.ksmeow.moe/backstage/user/token";

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = login.username.value;
  let password = window.btoa(login.password.value);
  console.log(password);
  fetch(url + `?username=${username}&password=${password}`, {
    method: "GET",
    // mode: "cors",
  })
    .then(response => {
      response.json().then(data => {
        console.log(data);
      })
    })
})

// ub5nf6v3MzQRktGe