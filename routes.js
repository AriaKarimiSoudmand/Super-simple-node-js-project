const fs = require("fs");

const handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Send Message</title></head>");
    res.write(
      '<body><h1>Enter your message</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      //console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const message = Buffer.concat(body).toString().split("=")[1];
      //console.log(message)
      fs.writeFile("message.txt", message, () => {
        console.log("Message Successfully writed to 'message.txt'");
      });
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
};

module.exports = handleRequest;
