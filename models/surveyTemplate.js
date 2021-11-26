let mongoose = require('mongoose');

let SurveyTemplates = mongoose.Schema({
    id: String,
    title: String,
    type: String,
    questions: Array,
},
{
  collection: "surveyTemplates"
});

module.exports = mongoose.model('SurveyTemplates', SurveyTemplates);