let express = require('express');

let router = express.Router();
let mongoose = require('mongoose');

let survey = require('../models/survey');

let surveyController = require('../controllers/survey');

/* GET Route for the Survey List - READ Operation */
router.get('/', surveyController.displayList);

/* GET Route for displaying the Add survey view- CREATE Operation */
router.get('/add', surveyController.displayAddSurvey);

/* POST Route for processing the Add survey - CREATE Operation */
router.post('/add', surveyController.processAddSurvey);

/* GET Route for displaying the Edit survey view - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditSurvey);

/* POST Route for processing the Edit survey - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditSurvey);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', surveyController.performDelete);


module.exports= router;