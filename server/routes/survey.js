let express = require("express");

let router = express.Router();
let mongoose = require("mongoose");

let survey = require("../models/survey");

let surveyController = require("../controllers/survey");

/* GET Route for the Survey List - READ Operation */
router.get("/", (req, res, next) => {
  survey.find((err, surveys) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("survey/index", {
        title: "Survey List",
        surveys: surveys,
      });
    }
  });
});

/* GET Route for displaying the Add survey view- CREATE Operation */
router.get("/add", (req, res, next) => {
  res.render("survey/add", {
    title: "Add Survey",
  });
});

/* POST Route for processing the Add survey - CREATE Operation */
router.post("/add", (req, res, next) => {
  surveyController.addSurvey(req, res);
});

/* GET Route for displaying the Edit survey view - UPDATE Operation */
router.get("/edit/:id", (req, res, next) => {
  survey.findById(req.params.id, (err, survey) => {
    if (err) {
      return console.log(err);
    } else {
      res.render("survey/edit", {
        title: "Edit Survey",
        survey: survey,
      });
    }
  });
});

/* POST Route for processing the Edit survey - UPDATE Operation */
router.post("/edit/:id", (req, res, next) => {
  surveyController.editSurvey(req, res);
});

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", (req, res, next) => {
  survey.findByIdAndRemove(req.params.id, (err, survey) => {
    if (err) {
      return console.log(err);
    } else {
      res.redirect("/survey");
    }
  });
});

module.exports = router;
