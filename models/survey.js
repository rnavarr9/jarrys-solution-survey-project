let mongoose = require('mongoose');
import { cronPlugin } from 'mongoose-cron';

let Surveys = mongoose.Schema(
  {
    id: String,
    title: String,
    type: String,
    questions: Array,
    surveyOwner: {
      ownerId: String,
      username: String,
    },
    templateId: String,
    // template: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "SurveyTemplates",
    // },
  },
  {
    collection: 'surveys',
  }
);
schema.plugin(cronPlugin, {
  handler: (doc) => console.log('processing', doc), // function or promise
});

let Task = db.model('Task', schema);
let cron = Task.createCron().start(); // call `cron.stop()` to stop processing

Task.create({
  cron: {
    enabled: true,
    removeExpired: true,
  },
});

module.exports = mongoose.model('Surveys', Surveys);
