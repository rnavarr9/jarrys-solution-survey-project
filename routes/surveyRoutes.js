const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");

module.exports = (app) => {
  app.get(`/api/surveys`, async (req, res) => {
    try {
      const surveys = await Surveys.find();
      console.log({ surveys });
      return res.json(surveys);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/surveys/:id`, async (req, res) => {
    let id = req.params.id;
    console.log({ id });
    try {
      const survey = await Surveys.findById(id).exec();
      console.log({ survey });
      return res.json(survey);
    } catch (error) {
      return res.send(error);
    }
  });

  app.post(`/surveys/add`, async (req, res) => {
    let newSurvey = Surveys({
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
    });

    Surveys.create(newSurvey, (err, survey) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Survey created!", survey);
        res.json({ success: true, msg: "New survey added!." });
      }
    });
  });

  app.get(`/surveys/delete/:id`, async (req, res, next) => {
    let id = req.params.id;
    Surveys.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: "Survey deleted." });
      }
    });
  });

  app.get(`/surveys/update/:id`, async (req, res, next) => {
    let id = req.params.id;

    Surveys.findById(id, (err, itemToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: "", survey: itemToEdit });
      }
    });
  });

  app.post(`/surveys/update/:id`, async (req, res, next) => {
    let id = req.params.id;

    let updatedSurvey = Surveys({
      _id: id,
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
    });

    Surveys.updateOne({ _id: id }, updatedSurvey, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({
          success: true,
          msg: "Survey updated.",
          survey: updatedSurvey,
        });
      }
    });
  });
};
