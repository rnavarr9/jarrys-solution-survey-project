import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Store from "../../Contexts/Store";

const Surveys = () => {
  const { handleBgColor } = useContext(Store);
  const [surveys, setSurveys] = useState(null);

  useEffect(() => {
    handleBgColor("white");
  }, []);

  useEffect(() => {
    renderSurveys();
  }, []);

  const renderSurveys = () => {
    axios
      .get(`/api/survey-templates`)
      .then((res) => {
        setSurveys(res.data);
      })
      .catch((err) => {
        console.log("Error rendering List of surveys!", err);
      });
  };
  console.log(surveys);
  if (surveys === null || surveys === undefined || !surveys.length) {
    return <div>No Surveys available</div>;
  }
  return (
    <>
      <h1>Available Surveys</h1>
      {surveys.map((s) => (
        <>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3>{s.title}</h3>&nbsp;&nbsp;
            <Link>Answer</Link>
          </div>
        </>
      ))}
    </>
  );
};

export default Surveys;
// export { default as DisplaySurveyTemplate } from "./DisplaySurveyTemplate";
// export { default as UpdateSurveyTemplate } from "./UpdateSurveyTemplate";
// export { default as CreateSurveyTemplate } from "./CreateSurveyTemplate";
