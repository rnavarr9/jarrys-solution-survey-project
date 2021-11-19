import React from "react";
import { Link } from "react-router-dom";

const SurveyList = ({ surveys, deleteSurvey }) => {
  if (surveys === null || !surveys.length) {
    return <div>No surveys have been created</div>;
  }

  return (
    <>
      <h1>Surveys' list</h1>
      {surveys.map((s, index) => (
        <div key={index}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ minWidth: "200px" }}>{s.title}</p>
            <Link to={`/displaySurvey/${s._id}`}>
              <button>Show</button>
            </Link>
            <Link to={`/updateSurvey/${s._id}`}>
              <button>Update</button>
            </Link>
            <Link to="/surveys">
              <button onClick={() => deleteSurvey(s._id)}>Delete</button>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default SurveyList;
