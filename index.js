const http = require("http");
const host = "localhost";
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.method == "GET") {
    let fileUrl;
    if (req.url == "/") {
      fileUrl = "/home";
    } else {
      fileUrl = req.url;
    }
    let filePath = path.resolve("./public" + fileUrl + ".html");
    let fileExt = path.extname(filePath);
    if (fileExt == ".html") {
      fs.exists(filePath, (exists) => {
        if (exists) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");
          fs.createReadStream(filePath).pipe(res);
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          fs.createReadStream("./public/error.html").pipe(res);
        }
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream("./public/error.html").pipe(res);
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("./public/error.html").pipe(res);
  }
});

server.listen(3000, host, () => {
  console.log("server started at http://" + host + ":3000");
});
