const express = require("express");
const app = express();

app.get("/getData", (req, res) => {
  res.send("Hello World");
});

app.listen(4200, (req, res) => {
  console.log("server started on port 4200");
});
