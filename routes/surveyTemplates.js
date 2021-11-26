const mongoose = require('mongoose');
const SurveyTemplates = mongoose.model('SurveyTemplates');

module.exports = (app) => {
  app.get(`/api/survey-templates`, async (req, res) => {
    try {
      const surveyTemplates = await SurveyTemplates.find();
      console.log({ surveyTemplates });
      return res.json(surveyTemplates);
    } catch (error) {
      return res.send(error);
    }
  });

  app.get(`/api/survey-templates/:id`, async (req, res) => {
    let id = req.params.id;
    console.log({ id });
    try {
      const surveyTemplate = await SurveyTemplates.findById(id).exec();
      console.log({ surveyTemplate });
      return res.json(surveyTemplate);
    } catch (error) {
      return res.send(error);
    }
  });

  app.post(`/api/survey-templates/add`, async (req, res) => {
    let newSurveyTemplate = SurveyTemplates({
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
    });

    SurveyTemplates.create(newSurveyTemplate, (err, surveyTemplate) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        console.log('Survey Template created!', surveyTemplate);
        res.json({ success: true, msg: 'New Survey Template added!.' });
      }
    });
  });

  app.get(`/api/survey-templates/delete/:id`, async (req, res, next) => {
    let id = req.params.id;
    SurveyTemplates.remove({ _id: id }, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: 'Survey Template deleted.' });
      }
    });
  });

  app.get(`/api/survey-templates/update/:id`, async (req, res, next) => {
    let id = req.params.id;

    SurveyTemplates.findById(id, (err, itemToEdit) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({ success: true, msg: '', surveyTemplate: itemToEdit });
      }
    });
  });

  app.post(`/api/survey-templates/update/:id`, async (req, res, next) => {
    let id = req.params.id;

    let updatedSurveyTemplate = SurveyTemplates({
      _id: id,
      title: req.body.title,
      type: req.body.type,
      questions: req.body.questions,
    });

    SurveyTemplates.updateOne({ _id: id }, updatedSurveyTemplate, (err) => {
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.json({
          success: true,
          msg: 'Survey Template updated.',
          surveyTemplate: updatedSurveyTemplate,
        });
      }
    });
  });
};
