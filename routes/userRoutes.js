const mongoose = require("mongoose");
const Users = mongoose.model("Users");
const verifyJWT = require("../middlewares/verifyJWT");
const bcrypt = require("bcrypt");

module.exports = (app) => {
  app.get(`/api/users`, verifyJWT, async (req, res) => {
    const userId = res.locals.id;
    console.log({userId})

    try {
      const users = await Users.findById(userId);
      console.log({users})
      return res.json([users]);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/api/users/:id`, verifyJWT, async (req, res) => {
    let id = req.params.id;
    try {
      const user = await Users.findById(id);
      console.log({ user });
      return res.json(user);
    } catch (error) {
      return res.send(error);
    }
  });

  app.post(`/api/users/add`, verifyJWT, async (req, res) => {
    let newUser = Users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      //add bcrypt to password
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
  app.get(`/api/users/delete/:id`, verifyJWT, async (req, res, next) => {
    let id = req.params.id;
    Users.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: "User deleted." });
      }
    });
  });
  app.get(`/api/users/update/:id`, verifyJWT, async (req, res, next) => {
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
  app.post(`/api/users/update/:id`, verifyJWT, async (req, res, next) => {
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
          user: updateUser,
        });
      }
    });
  });
};
