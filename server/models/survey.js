let mongoose = require('mongoose');

let surveyModel = mongoose.Schema({
    name: String,
    category: String
},
{
    collection: "survey"
})

module.exports = mongoose.model('Survey', surveyModel);