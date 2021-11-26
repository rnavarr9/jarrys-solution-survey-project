import React from "react";
import { useParams } from "react-router-dom";
import { ShortAnswerTemplate } from "../Commons";
import { useHistory } from "react-router-dom";
import { READ } from "../../Helpers/constants";

const DisplaySurveyTemplate = () => {
  const { id } = useParams();
  const hisory = useHistory();

  return <ShortAnswerTemplate id={id} hisory={hisory} action={READ} />;
};

export default DisplaySurveyTemplate;
