import React from "react";
import { useParams } from "react-router-dom";
import { ShortAnswerTemplate, Wrapper } from "../Commons";
import { useHistory } from "react-router-dom";
import { READ } from "../../Helpers/constants";

const DisplaySurveyTemplate = () => {
  const { id } = useParams();
  const hisory = useHistory();

  return (
    <Wrapper>
      <ShortAnswerTemplate id={id} hisory={hisory} action={READ} />
    </Wrapper>
  );
};

export default DisplaySurveyTemplate;
