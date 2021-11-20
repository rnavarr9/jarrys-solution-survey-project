let express = require("express");

let router = express.Router();
let mongoose = require("mongoose");

let user = require("../models/user");
let userController = require("../models/userController");

/* GET Route for the User List API - READ Operation */
router.get("/", (req, res, next) => {
  user.find((err, user) => {
    if (err) {
      return console.error(err);
    } else {
      res.json({
        user: user,
      });
    }
  });
});

/* GET Route for displaying the Add user view- CREATE Operation */
router.get("/add", (req, res, next) => {
  res.render("user/add", {
    title: "Add User",
  });
});

/* POST Route for processing the Add user - CREATE Operation */
router.post("/add", userController.createUser);

/* GET Route for displaying the Edit user view - UPDATE Operation */
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  user.findById(id, (err, user) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("user/edit", {
        title: "Edit User",
        user: user,
        password: req.params.password,
      });
    }
  });
});

/* POST Route for processing the Edit user - UPDATE Operation */
router.post("/edit/:id", userController.processEditUser);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  user.findByIdAndRemove(id, (err) => {
    if (err) {
      return console.error(err);
    } else {
      res.redirect("/user");
    }
  });
});

module.exports = router;
