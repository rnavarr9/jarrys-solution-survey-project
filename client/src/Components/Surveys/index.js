import React, { useState, useEffect } from "react";
import SurveyList from "./SurveyList";
import axios from "axios";
import { Link } from "react-router-dom";

const Survey = () => {
  const [surveys, setSurveys] = useState(null);
  console.log(surveys);

  useEffect(() => {
    renderSurveys();
  }, []);

  const renderSurveys = () => {
    axios
      .get(`/api/surveys`)
      .then((res) => {
        setSurveys(res.data);
      })
      .catch((err) => {
        console.log("Error rendering surveys!", err);
      });
  };

  const handleDeleteSurvey = (id) => {
    axios
      .get(`/surveys/delete/${id}`)
      .then((res) => {
        console.log("Survey deleted!");
      })
      .catch((err) => {
        console.log("Error deleting survey!", err);
      });
    axios
      .get(`/surveys`)
      .then((res) => {
        setSurveys(res.data);
      })
      .catch((err) => {
        console.log("Error fetching surveys!", err);
      });
  };

  return (
    <>
      <Link to="/createSurvey">
        <button>Create Survey</button>
      </Link>
      <SurveyList surveys={surveys} deleteSurvey={handleDeleteSurvey} />
    </>
  );
};

export default Survey;
export { default as DisplaySurvey } from "./DisplaySurvey";
export { default as UpdateSurvey } from "./UpdateSurvey";
export { default as CreateSurvey } from "./CreateSurvey";
