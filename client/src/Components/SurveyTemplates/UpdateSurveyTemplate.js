import React from "react";
import { useParams } from "react-router-dom";
import { ShortAnswerTemplate, Wrapper } from "../Commons";
import { useHistory } from "react-router-dom";
import { UPDATE } from "../../Helpers/constants";

const UpdateSurveyTemplate = () => {
  const { id } = useParams();
  const history = useHistory();

  return (
    <Wrapper>
      <ShortAnswerTemplate id={id} history={history} action={UPDATE} />;
    </Wrapper>
  );
};

export default UpdateSurveyTemplate;
