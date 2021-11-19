import React from "react";
import { useParams } from "react-router-dom";
import { ShortAnswerTemplate } from "../Commons";
import { useHistory } from "react-router-dom";
import { UPDATE } from "../../Helpers/constants"

const UpdateSurvey = () => {
  const { id } = useParams();
  const history = useHistory();

  return <ShortAnswerTemplate id={id} history={history} action={UPDATE} />;
};

export default UpdateSurvey;
