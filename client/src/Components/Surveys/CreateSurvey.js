import React, {useState} from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";


const newSurvey = {
  type: "",
  title: "",
};

const newShortAnswerQuestion = {
  type: "shortAnswerQuestion", //for db purposes
  question: "",
  answer: "",
};

const CreateSurvey = () => {
  const [survey, setSurvey] = useState(newSurvey);
  const [step, setStep] = useState(0);
  const [surveyType, setSurveyType] = useState("shortAnswer");
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  const handleSelectTemplate = (e) => {
    setSurvey({ ...survey, type: surveyType });
    setStep(1);
  };

  const handleCreateQuestion = () => {
    let newQuestion = JSON.parse(JSON.stringify(newShortAnswerQuestion));
    setQuestions([...questions, newQuestion]);
  };

  const handleOnChangeSurveyType = (e) => {
    setSurveyType(e.target.value);
  };

  const handleChangeValueSurvey = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSurvey({ ...survey, [name]: value });
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

  const handleSaveSurvey = () => {
    let newSurvey = { ...survey, questions };
    console.log("localSurvey", newSurvey);
    axios
      .post(`/api/surveys/add`, newSurvey)
      .then((res) => {
        console.log({ res });
        setQuestions([]);
        setSurvey(newSurvey);
        history.push("/surveys")
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    setSurvey(newSurvey);
  };

  if (step === 0) {
    return (
      <>
        <p>Create Survey component</p>
        <br />
        <label htmlFor="surveyTemplates">Choose a survey template:</label>
        <br />
        <select
          name="surveyTemplates"
          id="surveyTemplates"
          onChange={handleOnChangeSurveyType}
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
        <p>Create Survey component</p>
        <br />
        <label htmlFor="surveyTitle">Choose a title:</label>
        <input
          id="surveyTitle"
          type="text"
          name="title"
          value={survey.title}
          placeholder="select a title"
          onChange={handleChangeValueSurvey}
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
        <button onClick={handleSaveSurvey}>Save Survey</button>
      </>
    );
  }
  return (
    <>
      <p>Create Survey component</p>
      {/* <div>{renderQuestions()}</div> */}
    </>
  );
};

export default CreateSurvey;
