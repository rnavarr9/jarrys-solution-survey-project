let mongoose = require("mongoose");

let SurveyTemplate = mongoose.Schema(
  {
    id: String,
    title: String,
    type: String,
    questions: Array,
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "SurveyTemplate",
  }
);

module.exports = mongoose.model("SurveyTemplate", SurveyTemplate);
