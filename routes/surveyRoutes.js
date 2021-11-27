const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");

module.exports = (app) => {
  app.post(`/api/survey/add`, async (req, res) => {
    let newSurvey = Surveys({
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
      user: res.locals.id,
    });

    Surveys.create(newSurvey, (err, surveyTemplate) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Survey created!", surveyTemplate);
        res.json({ success: true, msg: "New Survey added!." });
      }
    });
  });
};
