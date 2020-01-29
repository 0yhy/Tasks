const url = "https://byupick.ksmeow.moe/backstage/user/token";

let form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let username = login.username.value;
  let password = login.password.value;
  fetch(url + `?username=${username}&password=${password}`, {
    method: "GET",
    mode: "cors",
  })
    .then(response => {
      response.json().then(data => {
        console.log(data.data.token);
      })
    })
})