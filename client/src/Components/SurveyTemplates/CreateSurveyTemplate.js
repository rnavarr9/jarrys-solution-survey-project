import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const newSurveyTemplate = {
  type: "",
  title: "",
};

const newShortAnswerQuestion = {
  type: "shortAnswerQuestion", //for db purposes
  question: "",
  answer: "",
};

const CreateSurveyTemplate = () => {
  const [surveyTemplate, setSurveyTemplate] = useState(newSurveyTemplate);
  const [step, setStep] = useState(0);
  const [surveyTemplateType, setSurveyTemplateType] = useState("shortAnswer");
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  const handleSelectTemplate = (e) => {
    setSurveyTemplate({ ...surveyTemplate, type: surveyTemplateType });
    setStep(1);
  };

  const handleCreateQuestion = () => {
    let newQuestion = JSON.parse(JSON.stringify(newShortAnswerQuestion));
    setQuestions([...questions, newQuestion]);
  };

  const handleOnChangeSurveyTemplateType = (e) => {
    setSurveyTemplateType(e.target.value);
  };

  const handleChangeValueSurveyTemplate = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSurveyTemplate({ ...surveyTemplate, [name]: value });
  };

  const handleChangeValueQuestion = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;

    const newQuestions = [...questions];
    newQuestions[index][name] = value;
    console.log(newQuestions);
    setQuestions([...newQuestions]);
  };

  const handleRemoveQuestion = (e, index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions([...newQuestions]);
  };

  const handleSaveSurveyTemplate = () => {
    let newSurveyTemplate = { ...surveyTemplate, questions };
    console.log("localSurveyTemplate", newSurveyTemplate);
    axios
      .post(`/api/survey-templates/add`, newSurveyTemplate)
      .then((res) => {
        console.log({ res });
        setQuestions([]);
        setSurveyTemplate(newSurveyTemplate);
        history.push("/surveyTemplates");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    setSurveyTemplate(newSurveyTemplate);
  };

  if (step === 0) {
    return (
      <>
        <p>Create Survey Template component</p>
        <br />
        <label htmlFor="surveyTemplate">Choose a Survey Template:</label>
        <br />
        <select
          name="surveyTemplate"
          id="surveyTemplate"
          onChange={handleOnChangeSurveyTemplateType}
        >
          {/* <option value="yesno">Yes/No questions</option> */}
          {/* <option value="multiple">Multiple choise questions </option> */}
          <option value="shortAnswer">Short Answer questions</option>
        </select>
        <button onClick={handleSelectTemplate}>Select</button>
      </>
    );
  } else if (step === 1) {
    return (
      <>
        <p>Create Survey Template component</p>
        <br />
        <label htmlFor="surveyTemplateTitle">Choose a title:</label>
        <input
          id="surveyTemplateTitle"
          type="text"
          name="title"
          value={surveyTemplate.title}
          placeholder="select a title"
          onChange={handleChangeValueSurveyTemplate}
        />
        <br />
        <button onClick={handleCreateQuestion}>Add Question</button>
        {questions.map((q, index) => (
          <div key={index}>
            <label htmlFor={index}>{`Question ${index + 1}: `}</label>
            <input
              id={index}
              type="text"
              name="question"
              value={q.question}
              placeholder="Question in max 80 characters"
              onChange={(e) => handleChangeValueQuestion(e, index)}
            />
            <br />
            <label htmlFor={index}>{`Answer ${index + 1}: `}</label>
            <input
              id={index}
              type="text"
              name="answer"
              value={q.answer}
              placeholder="Answer in max 280 characters"
              onChange={(e) => handleChangeValueQuestion(e, index)}
              disabled={true}
            />
            <button onClick={(e) => handleRemoveQuestion(e, index)}>
              Remove
            </button>
          </div>
        ))}
        <br />
        <br />
        <br />
        <br />
        <button onClick={handleSaveSurveyTemplate}>Save Survey Template</button>
      </>
    );
  }
  return (
    <>
      <p>Create Survey Template component</p>
      {/* <div>{renderQuestions()}</div> */}
    </>
  );
};

export default CreateSurveyTemplate;
