let mongoose = require("mongoose");

let Surveys = mongoose.Schema(
  {
    id: String,
    questions: Array,
    surveyTemplate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyTemplate",
    },
  },
  {
    collection: "surveys",
  }
);

module.exports = mongoose.model("Surveys", Surveys);
