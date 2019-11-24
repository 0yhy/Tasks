let form = document.querySelector("form");
let div = document.querySelector("#mydiv");

let imgs = ["png", "svg", "jpg"];
let videos = ["mp4", "flv", "avi"];
let audios = ["mp3", "flac", "wma"];
let txts = ["txt", "html", "js", "css", "md"];

let path = "http://127.0.0.1:1027/1."

form.onsubmit = function (e) {
  e.preventDefault();
  let suffix = myform.selector.value;
  let url = path + suffix;

  // 如果是图片
  if (imgs.indexOf(suffix) !== -1) {
    let img = document.createElement("img");
    console.log(img);
    img.setAttribute("src", url);
    div.innerHTML = "";
    div.append(img);
  }
  // 如果是视频
  else if (videos.indexOf(suffix) !== -1) {
    let video = document.createElement("video");
    video.setAttribute("src", url);
    video.setAttribute("controls", true);
    div.innerHTML = "";
    div.append(video);
  }
  // 如果是文本
  else if (txts.indexOf(suffix) !== -1) {
    location.href = url;
  }
  // 如果是音频
  else if (audios.indexOf(suffix) !== -1) {
    let audio = document.createElement("audio");
    audio.setAttribute("src", url);
    audio.setAttribute("controls", true);
    div.innerHTML = "";
    div.append(audio);
  }
  // 不支持类型
  else {
    console.log("No")
  }
};