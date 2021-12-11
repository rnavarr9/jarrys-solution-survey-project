const mongoose = require("mongoose");
const Surveys = mongoose.model("Surveys");
const SurveyTemplateReport = mongoose.model("SurveyTemplateReport")
const SurveyReport = mongoose.model("SurveyReport")
const SurveyTemplates = mongoose.model("SurveyTemplates");
const verifyJWT = require("../middlewares/verifyJWT");

let reportController = require('../controllers/report')

module.exports = (app) => {
    app.get(`/api/admin/report/surveys`, reportController.getSurveyTemplateReportSummary);

    app.get(`/api/admin/report/surveys/:id`, reportController.getSurveyReport);

    app.get('/api/admin/report/download', reportController.getSurveyTemplateReportSummaryCsv);
	
    app.get('/api/admin/report/surveys/:id/download', reportController.getSurveyReportCsv);
}
