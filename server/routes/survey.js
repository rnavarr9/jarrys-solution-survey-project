let express = require('express');

let router = express.Router();
let mongoose = require('mongoose');

let survey = require('../models/survey');

let surveyController = require('../controllers/survey');

/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displayList);


module.exports= router;
