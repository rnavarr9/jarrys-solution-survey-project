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

module.exports.displayAddPage = (req, res, next) => {
    res.render('surveys/add', {title: 'Create a survey', bodyClass: ""})          
}

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = surveyItem({
        "name": req.body.surveyName,
        "category": req.body.surveyCategory,
    });

    surveyItem.create(newSurvey, (err, survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/');
        }
    });

}


module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    surveyItem.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('surveys/edit', {title: 'Edit Survey', bodyClass: "", survey: itemToEdit})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = surveyItem({
        "_id": id,
        "name": req.body.surveyName,
        "category": req.body.surveyCategory
    });

    surveyItem.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.redirect('/');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    surveyItem.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             res.redirect('/');
        }
    });
}