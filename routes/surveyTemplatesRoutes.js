const mongoose = require("mongoose");
const SurveyTemplates = mongoose.model("SurveyTemplates");
const verifyJWT = require("../middlewares/verifyJWT");

module.exports = (app) => {
  app.get(`/api/survey-templates`, async (req, res) => {
    try {
      let surveyTemplates = await SurveyTemplates.find();
      console.log({surveyTemplates})
      return res.json(surveyTemplates);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/api/admin/survey-templates`, verifyJWT, async (req, res) => {
    const userIdInToken = res.locals.id;
    try {
      let surveyTemplates = await SurveyTemplates.find({
        user: { _id: userIdInToken },
      }).populate("user", "username");
      // const surveyTemplates = await SurveyTemplates.find().populate('user', 'username').select('type user');
      return res.json(surveyTemplates);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/api/admin/survey-templates/:id`, verifyJWT, async (req, res) => {
    let id = req.params.id;
    try {
      const surveyTemplate = await SurveyTemplates.findById(id).exec();
      return res.json(surveyTemplate);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/api/survey-templates/:id`, async (req, res) => {
    let id = req.params.id;
    try {
      const surveyTemplate = await SurveyTemplates.findById(id).exec();
      return res.json(surveyTemplate);
    } catch (error) {
      return res.send(error);
    }
  });

  app.post(`/api/survey-templates/add`, verifyJWT, async (req, res) => {
    let newSurveyTemplate = SurveyTemplates({
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
      user: res.locals.id,
      active: true,
    });

    SurveyTemplates.create(newSurveyTemplate, (err, surveyTemplate) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log("Survey Template created!", surveyTemplate);
        res.json({ success: true, msg: "New Survey Template added!." });
      }
    });
  });

  app.get(
    `/api/survey-templates/delete/:id`,
    verifyJWT,
    async (req, res, next) => {
      let id = req.params.id;
      SurveyTemplates.remove({ _id: id }, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.json({ success: true, msg: "Survey Template deleted." });
        }
      });
    }
  );

  app.get(
    `/api/survey-templates/update/:id`,
    verifyJWT,
    async (req, res, next) => {
      let id = req.params.id;

      SurveyTemplates.findById(id, (err, itemToEdit) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.json({ success: true, msg: "", surveyTemplate: itemToEdit });
        }
      });
    }
  );

  app.post(
    `/api/survey-templates/update/:id`,
    verifyJWT,
    async (req, res, next) => {
      let id = req.params.id;

      let updatedSurveyTemplate = SurveyTemplates({
        _id: id,
        title: req.body.title,
        type: req.body.type,
        questions: req.body.questions,
        active: req.body.active,
      });

      SurveyTemplates.updateOne({ _id: id }, updatedSurveyTemplate, (err) => {
        if (err) {
          console.log(err);
          res.end(err);
        } else {
          res.json({
            success: true,
            msg: "Survey Template updated.",
            surveyTemplate: updatedSurveyTemplate,
          });
        }
      });
    }
  );
};
