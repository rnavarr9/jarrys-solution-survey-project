let mongoose = require('mongoose');

let Surveys = mongoose.Schema({
    id: String,
    title: String,
    type: String,
    questions: Array,
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Surveys', Surveys);