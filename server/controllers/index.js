var express = require("express");
var router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

// create a reference to the model
let surveyItem = require("../models/survey");
let userModel = require("../models/user");
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
  surveyItem.find((err, cList) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("surveys/list", {
        title: "Surveys",
        bodyClass: "",
        surveyList: cList,
      });
    }
  });
};

module.exports.displayAboutPage = (req, res, next) => {
  res.render("main/about", { title: "About Us", bodyClass: "" });
};

module.exports.displayLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.User) {
    res.render("main/login", { title: "Login", bodyClass: "" });
  } else {
    // if already logged in, redirect to the survey list
    res.redirect("/");
  }
};

module.exports.processLoginPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.User) {
    // retrieve the username and password from the request body
    let username = req.body.username;
    let password = req.body.password;

    // use the static method on the User model to find a user based on the username
    User.authenticate(username, password, (err, user) => {
      if (err || !user) {
        let err = new Error("Wrong username or password");
        err.status = 401;
        return next(err);
      } else {
        // if user is found and password is right
        // create a session for the user
        req.session.userId = user._id;
        return res.redirect("/");
      }
    });
  } else {
    // if already logged in, redirect to the survey list
    res.redirect("/");
  }
};

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.User) {
    res.render("main/register", { title: "Register", bodyClass: "" });
  } else {
    // if already logged in, redirect to the survey list
    res.redirect("/");
  }
};

module.exports.processRegisterPage = (req, res, next) => {
  // check if the user is already logged in
  if (!req.User) {
    // retrieve the username and password from the request body
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    // use the static method on the User model to find a user based on the username
    User.register(
      new User({
        username: username,
        email: email,
      }),
      password,
      (err, user) => {
        if (err) {
          console.log("Error while user register! " + err);
          return res.render("main/register", {
            title: "Register",
            bodyClass: "",
            error: err,
          });
        } else {
          // if user is found and password is right
          // create a session for the user
          req.session.userId = user._id;
          return res.redirect("/");
        }
      }
    );
  } else {
    // if already logged in, redirect to the survey list
    res.redirect("/");
  }
};

module.exports.performLogout = (req, res, next) => {
  // check if the user is already logged in
  if (!req.User) {
    // if already logged in, redirect to the survey list
    res.redirect("/");
  } else {
    // if already logged in, redirect to the survey list
    req.session.destroy();
    res.redirect("/");
  }
};
