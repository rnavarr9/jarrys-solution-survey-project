let mongoose = require("mongoose");

let SurveyTemplate = mongoose.Schema(
  {
    id: String,
    title: String,
    type: String,
    questions: Array,
  },
  {
    collection: "SurveyTemplate",
  }
);

module.exports = mongoose.model("SurveyTemplate", SurveyTemplate);
