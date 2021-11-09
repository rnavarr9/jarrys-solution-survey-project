var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var db = mongoose.connect(
  "mongodb+srv://jarryssolution:jarryssolution@cluster0.ymrhl.mongodb.net/myFirstDatabase?retryWrites=true&w=majorityinstead of typing",
  function (err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database");
    }
  }
);

var app = express();
app.use(bodyParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
});

var model = mongoose.model("User", UserSchema);

app.post("/api/SaveUser", function (req, res) {
  var mod = new model(req.body);
  if (mod.name == "Save") {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({ data: "Record has been inserted" });
      }
    });
  } else {
    model.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({ data: "Record has been updated" });
        }
      }
    );
  }
});

app.listen(8080, function () {
  console.log("Server is running on port 8080");
});
