import React, { useEffect, useState } from "react";
import axios from "axios";
import { UPDATE } from "../../../Helpers/constants";

const ShortAnswerTemplate = ({ id, action, history }) => {
  const [surveyTemplate, setSurveyTemplate] = useState(null);

  console.log({ surveyTemplate, id });
  useEffect(() => {
    renderSurveyTemplate();
  }, []);

  const renderSurveyTemplate = () => {
    if (id) {
      axios
        .get(`/api/survey-templates/${id}`)
        .then((response) => {
          setSurveyTemplate(response.data);
        })
        .catch((err) => {
          console.log("Error fetching Survey Template!");
        });
    }
  };

  const saveChanges = (e, id) => {
    axios
      .post(`/api/survey-templates/update/${id}`, surveyTemplate)
      .then((res) => {
        console.log("Survey Template updated!", res);
        history.push("/surveyTemplates");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const handleChangeValueQuestion = (e, index) => {
    if (action === UPDATE) {
      const value = e.target.value;
      const name = e.target.name;

      let newQuestions = JSON.parse(JSON.stringify(surveyTemplate.questions));
      newQuestions[index][name] = value;
      setSurveyTemplate({ ...surveyTemplate, questions: newQuestions });
    }
  };

  const handleChangeValueSurveyTemplate = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSurveyTemplate({ ...surveyTemplate, [name]: value });
  };

  if (!surveyTemplate) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      {action === UPDATE ? (
        <>
          <label htmlFor="surveyTemplateTitle">Title:</label>
          <input
            id="surveyTemplateTitle"
            type="text"
            name="title"
            value={surveyTemplate.title}
            placeholder="select a title"
            onChange={handleChangeValueSurveyTemplate}
          />
        </>
      ) : (
        <p>{`Title: ${surveyTemplate.title}`}</p>
      )}
      {typeof surveyTemplate.questions === "object"
        ? surveyTemplate.questions.map((q, index) => (
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
        <button onClick={(e) => saveChanges(e, surveyTemplate._id)}>
          Save Changes
        </button>
      ) : null}
    </div>
  );
};

export default ShortAnswerTemplate;
