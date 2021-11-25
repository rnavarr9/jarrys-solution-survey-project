import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE } from "../../../Helpers/constants";

const ShortAnswerTemplate = ({ id, action, history }) => {
  const [survey, setSurvey] = useState(null);

  console.log({ survey, id });
  useEffect(() => {
    renderSurvey();
  }, []);

  const renderSurvey = () => {
    if (id) {
      axios
        .get(`/api/surveys/${id}`)
        .then((response) => {
          setSurvey(response.data);
        })
        .catch((err) => {
          console.log("Error fetching survey!");
        });
    }
  };

  const saveChanges = (e, id) => {
    axios
      .post(`/api/surveys/update/${id}`, survey)
      .then((res) => {
        console.log("Survey updated!", res);
        history.push("/surveys");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const handleChangeValueQuestion = (e, index) => {
    if (action === UPDATE) {
      const value = e.target.value;
      const name = e.target.name;

      let newQuestions = JSON.parse(JSON.stringify(survey.questions));
      newQuestions[index][name] = value;
      setSurvey({ ...survey, questions: newQuestions });
    }
  };

  const handleChangeValueSurvey = (e) => {
    console.log(e);
    const value = e.target.value;
    const name = e.target.name;
    setSurvey({ ...survey, [name]: value });
  };

  if (!survey) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      {action === UPDATE ? (
        <>
          <label htmlFor="surveyTitle">Title:</label>
          <input
            id="surveyTitle"
            type="text"
            name="title"
            value={survey.title}
            placeholder="select a title"
            onChange={handleChangeValueSurvey}
          />
        </>
      ) : (
        <p>{`Title: ${survey.title}`}</p>
      )}
      {typeof survey.questions === "object"
        ? survey.questions.map((q, index) => (
            <div key={index}>
              {action === UPDATE ? (
                <div>
                  <label htmlFor={index}>Question: </label>
                  <input
                    type="text"
                    id={index}
                    name="question"
                    value={q.question}
                    onChange={(e) => handleChangeValueQuestion(e, index)}
                  />
                  <br />
                  <input
                    type="text"
                    id={index}
                    name="answer"
                    value={q.answer}
                    disabled
                  />
                  <br />
                </div>
              ) : (
                <div>
                  <label htmlFor={index}>{q.question}</label>
                  <br />
                  <input
                    type="text"
                    id={index}
                    name="answer"
                    value={q.answer}
                    disabled
                  />
                </div>
              )}
            </div>
          ))
        : null}
      {action === UPDATE ? (
        <button onClick={(e) => saveChanges(e, survey._id)}>
          Save Changes
        </button>
      ) : null}
    </div>
  );
};

export default ShortAnswerTemplate;
