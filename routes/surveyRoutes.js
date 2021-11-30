const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");
const Users = mongoose.model("Users");

module.exports = (app) => {
  app.post(`/api/survey/add`, async (req, res) => {
    const adminId = req.body.user;
    const user = await Users.findById(adminId);
    const surveyOwner = { ownerId: user._id, username: user.username };

    let newSurvey = Surveys({
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
      surveyOwner,
      templateId: req.body._id,
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
