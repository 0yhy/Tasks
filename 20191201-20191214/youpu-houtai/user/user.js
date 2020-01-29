const url = "https://byupick.ksmeow.moe/backstage/";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzY0Mzc2NjAsImlhdCI6MTU3NjQyMzI2MCwidXNlcm5hbWUiOiJhZG1pbiJ9.GLFQ4LIa9NvcrweOfs2Wr9yA3V6j5-4C0wV0ajTwGoI";

(function addUser() {
  let addUserForm = document.querySelector(".addUser form");
  addUserForm.addEventListener("submit", function (e) {
    let username = addUser.username.value;
    let password = addUser.password.value;
    let password1 = addUser.password1.value;
    e.preventDefault();
    if (password !== password1) {
      alert("两次输入密码不相等！请重新输入")
    }
    if (!username) {
      alert("用户名不能为空！")
    }
    else {
      fetch(url + `user/`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({//post请求参数 
          name: username,
          password: window.btoa(password)
        })
      })
        .then(response => {
          console.log(response.text());
        })
    }
  })
})();

(function deleteUser() {
  let deleteUserForm = document.querySelector(".deleteUser form");
  deleteUserForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = deleteUser.username.value;
    if (!username) {
      alert("请输入用户名！")
    }
    else {
      fetch(url + "user/", {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        body: JSON.stringify({//post请求参数 
          username: username,
        })
      })
        .then(response => {
          console.log(response.text())
        })
    }
  })
})();

(function editPassword() {
  let editShopForm = document.querySelector(".editPassword form");
  editShopForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let username = editShopForm.username.value;
    let newpassword = editShopForm.password.value;
    fetch(url + "user/password", {
      body: JSON.stringify({
        username: username,
        password: newpassword
      })
    })
  })
})();

(function addShop() {
  let addShopForm = document.querySelector(".addShop form");
  addShopForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let shopname = addShop.name.value;
    let category = addShop.category.value;
    let cost = addShop.cost.value;
    let time = addShop.time.value;
    let address = addShop.address.value;
    let area = addShop.area.value;
    if (!shopname || !cost || !time || !address || !area) {
      alert("有字段为空!");
    }
    fetch(url + "shop/", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({//post请求参数 
        "name": shopname,
        "category": category,
        "subcategory": "找吃的",
        "cost": cost,
        "time": time,
        "address": address,
        "area": area
      })
    })
      .then(response => {
        console.log(response.json());
      })
  });
})