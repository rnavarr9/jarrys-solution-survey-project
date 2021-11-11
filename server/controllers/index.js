
var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

// create a reference to the model
let surveyItem = require('../models/survey');

module.exports.displayHomePage = (req, res, next) => {
  surveyItem.find((err, cList) => {
    if(err)
    {
      return console.error(err);
    }
    else
    {
      res.render('surveys/list', {title: 'Surveys', bodyClass: "", surveyList: cList});      
    }
  });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('main/about', { title: 'About Us', bodyClass: "" });
}
