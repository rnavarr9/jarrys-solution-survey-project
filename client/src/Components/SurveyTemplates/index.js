import React, { useState, useEffect } from "react";
import SurveyTemplateList from "./SurveyTemplateList";
import axios from "axios";
import { Link } from "react-router-dom";

const SurveyTemplate = () => {
  const [surveyTemplates, setSurveyTemplates] = useState(null);
  console.log(surveyTemplates);

  useEffect(() => {
    renderSurveyTemplates();
  }, []);

  const renderSurveyTemplates = () => {
    axios
      .get(`/api/admin/survey-templates`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSurveyTemplates(res.data);
      })
      .catch((err) => {
        console.log("Error rendering Survey Templates!", err);
      });
  };

  const handleDeleteSurveyTemplate = (id) => {
    axios
      .get(`/api/survey-templates/delete/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("Survey Template deleted!");
      })
      .catch((err) => {
        console.log("Error deleting Survey Template!", err);
      });
    axios
      .get(`/api/admin/survey-templates`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSurveyTemplates(res.data);
      })
      .catch((err) => {
        console.log("Error fetching Survey Templates!", err);
      });
  };

  return (
    <>
      <Link to="/createSurveyTemplate">
        <button>Create Survey Template</button>
      </Link>
      <SurveyTemplateList
        surveyTemplates={surveyTemplates}
        deleteSurveyTemplate={handleDeleteSurveyTemplate}
      />
    </>
  );
};

export default SurveyTemplate;
export { default as DisplaySurveyTemplate } from "./DisplaySurveyTemplate";
export { default as UpdateSurveyTemplate } from "./UpdateSurveyTemplate";
export { default as CreateSurveyTemplate } from "./CreateSurveyTemplate";
