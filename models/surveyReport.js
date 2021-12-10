let mongoose = require('mongoose');

let SurveyReport = mongoose.Schema({
    templateId: String,
    title: String,
    respondents: Number,
    questions: Array,
    respondentsByDate: Array
});

module.exports = mongoose.model('SurveyReport', SurveyReport);