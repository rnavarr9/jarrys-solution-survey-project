const mongoose = require("mongoose");
const Users = mongoose.model("Users");

const bcrypt = require("bcrypt");
module.exports = (app) => {
  app.get(`/users`, async (req, res) => {
    try {
      const users = await Users.find();
      console.log({ users });
      return res.json(users);
    } catch (error) {
      return res.send(error);
    }
  });
  app.post(`/users/add`, async (req, res) => {
    let newUser = Users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    Users.create(newUser, (err, user) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("User created!", user);
        res.json({ success: true, msg: "New user added!." });
      }
    });
  });
  app.get(`/users/delete/:id`, async (req, res, next) => {
    let id = req.params.id;
    Users.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: "Survey deleted." });
      }
    });
  });
  app.get(`/users/update/:id`, async (req, res, next) => {
    let id = req.params.id;
    Users.findById(id, (err, userToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: "", user: userToEdit });
      }
    });
  });
  app.post(`/users/update/:id`, async (req, res, next) => {
    let id = req.params.id;
    let updateUser = Users({
      _id: id,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    Users.updateOne({ _id: id }, updateUser, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({
          success: true,
          msg: "User updated.",
          survey: updateUser,
        });
      }
    });
  });
};
