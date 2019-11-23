  // //处理视频文件
  // if (mimeType === "video/mp4") {
  //   response.writeHead(200, { "Content-Type": mimeType });
  //   let stream = fs.createReadStream(filepath);
  //   stream.on("error", function () {
  //     response.writeHead(500, { "Content-Type": mimeType });
  //     response.end("<h1>500 Server Error</h1>");
  //   })
  //   stream.pipe(response);
  // }