let mongoose = require('mongoose');

let Surveys = mongoose.Schema({
    id: String,
    title: String,
    type: String,
    questions: Array,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
    },
    template: {
        type:mongoose.mongoose.Types.ObjectId,
        ref: 'SurveyTemplates'
    }
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Surveys', Surveys);