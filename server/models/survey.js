let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    surveyName: String,
    category: String
},
{
    collection: "survey"
})

module.exports = mongoose.model('Survey', surveyModel);