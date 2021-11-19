let express = require("express");

let router = express.Router();
let mongoose = require("mongoose");

let survey = require("../models/survey");

let surveyController = require("../controllers/survey");

/* GET Route for the Survey List - READ Operation */
router.get("/", (req, res, next) => {
  survey.find((err, survey) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("survey/index", {
        title: "Survey",
        survey: survey,
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
router.post("/add", surveyController.createSurvey);
S;
/* GET Route for displaying the Edit survey view - UPDATE Operation */
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;
  survey.findById(id, (err, survey) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("survey/edit", {
        title: "Edit Survey",
        survey: survey,
      });
    }
  });
});

/* POST Route for processing the Edit survey - UPDATE Operation */
router.post("/edit/:id", surveyController.processEditSurvey);

/* GET to perform  Deletion - DELETE Operation */
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  survey.findByIdAndRemove(id, (err) => {
    if (err) {
      return console.error(err);
    } else {
      res.redirect("/survey");
    }
  });
});

module.exports = router;
