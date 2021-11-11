let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let surveyItem = require('../models/survey');

module.exports.displayList = (req, res, next) => {
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

