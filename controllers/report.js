const mongoose = require("mongoose");
const { mapReduce } = require("../models/survey");
const Surveys = mongoose.model("Surveys");
const SurveyTemplateReport = mongoose.model("SurveyTemplateReport")
const SurveyReport = mongoose.model("SurveyReport")
const SurveyTemplates = mongoose.model("SurveyTemplates");

module.exports.getSurveyTemplateReportSummary = async (req, res) => {
    const userIdInToken = res.locals.id;
    try {
        let surveyTemplates = await SurveyTemplates.find({
            user: { _id: userIdInToken },
        }).populate("user", "username");

        let surveys = await Surveys.find();

        let surveyTemplateReports = [];

        surveyTemplates.forEach(element => {
            let x = 0;
            surveys.forEach(survey => {
                if (element._id == survey.templateId) {
                    x++;
                }
            });

            let templateReport = new SurveyTemplateReport({
                title: element.title,
                templateId: element._id,
                active: element.active,
                respondents: x
            });
            surveyTemplateReports.push(templateReport);
        });

        return res.json(surveyTemplateReports);
    } catch (error) {
        return res.send(error);
    }
}

module.exports.getSurveyReport = async (req, res) => {
    let id = req.params.id;
    try {
        let surveyTemplate = await SurveyTemplates.findById(id).exec();
        let surveys = await Surveys.find({
            templateId: id
        });

        let report = new SurveyReport({
            templateId: id,
            title: surveyTemplate.title,
            respondents: surveys.length
        });

        surveyTemplate.questions.forEach(question => {
            let yesAnsweredCount = 0;
            let noUnAnsweredCount = 0;

            surveys.forEach(survey => {
                survey.questions.forEach(answer => {

                    if (answer.question == question.question) {

                        if (surveyTemplate.type == "AGREE_DISAGREE") {
                            if (answer.answer == "true") {
                                yesAnsweredCount++
                            } else {
                                noUnAnsweredCount++;
                            }
                        } else if (surveyTemplate.type == "shortAnswerQuestion" || surveyTemplate.type == "SHORT_ANSWER") {

                            if (answer.answer.trim() == "") {
                                noUnAnsweredCount++;
                            } else {
                                yesAnsweredCount++
                            }
                        }
                    }
                });
            });

            let x = {
                question: question.question,
                yesAnswered: yesAnsweredCount,
                noUnAnswered: noUnAnsweredCount
            }
            report.questions.push(x);
        });

        const dateMap = new Map();
        surveys.forEach(survey => {
            var date = survey.creationDate.toLocaleDateString('en-US');
            var ctr = 1

            if(dateMap.has(date)){
                ctr = 1 + dateMap.get(date);
            }
            dateMap.set(date, ctr);
        });

        dateMap.forEach(function(value, key) {
            let x = {
                data: key,
                respondents: value
            }
            report.respondentsByDate.push(x);
        });

        return res.json(report);
    } catch (error) {
        return res.send(error);
    }
}