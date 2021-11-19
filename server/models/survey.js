let mongoose = require("mongoose");

let surveyModel = mongoose.Schema(
  {
    name: String,
    category: String,
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

    status: String,
    type: String,
    userId: String,
  },
  {
    collection: "survey",
  }
);

module.exports = mongoose.model("Survey", surveyModel);
