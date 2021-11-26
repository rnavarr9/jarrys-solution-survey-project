import React from "react";
import { Link } from "react-router-dom";

const SurveyTemplateList = ({ surveyTemplates, deleteSurveyTemplate }) => {
  console.log({surveyTemplates})
  if (surveyTemplates === null || surveyTemplates === undefined  || !surveyTemplates.length) {
    return <div>No Survey Template have been created</div>;
  }

  return (
    <>
      <h1>Survey Templates' list</h1>
      {surveyTemplates.map((s, index) => (
        <div key={index}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ minWidth: "200px" }}>{s.title}</p>
            <Link to={`/displaySurveyTemplate/${s._id}`}>
              <button>Show</button>
            </Link>
            <Link to={`/updateSurveyTemplate/${s._id}`}>
              <button>Update</button>
            </Link>
            <Link to="/surveyTemplates">
              <button onClick={() => deleteSurveyTemplate(s._id)}>Delete</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default SurveyTemplateList;
