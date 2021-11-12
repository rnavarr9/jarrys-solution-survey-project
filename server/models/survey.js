let mongoose = require("mongoose");

let surveyModel = mongoose.Schema(
  {
    name: String,
    description: String,
    questions: [
      {
        question: String,
        answers: [
          {
            answer: String,
          },
        ],
      },
    ],
    category: String,
  },
  {
    collection: "survey",
  }
);

module.exports = mongoose.model("Survey", surveyModel);
