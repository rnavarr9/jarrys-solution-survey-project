// require modules for the User Model
let mongoose = require("mongoose");

let User = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "users",
  }
);
module.exports.User = mongoose.model("User", User);
