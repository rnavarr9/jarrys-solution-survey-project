import React, { useState, useEffect } from "react";
import ShortAnswer from "./ShortAnswer";
import { useParams } from "react-router-dom";
import { openAPI } from "../../apis";
import { Box, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";

const Survey = () => {
  const { id } = useParams();
  const [localSurvey, setLocalSurvey] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const runThis = () => {
      if (id) {
        openAPI
          .get(`/api/survey-templates/${id}`)
          .then((s) => setLocalSurvey(s.data));
      }
    };
    runThis();
  }, []);

  const onChangeValueShortAnswer = (e, index) => {
    const { name, value } = e.target;

    let newQuestions = JSON.parse(JSON.stringify(localSurvey.questions));
    newQuestions[index][name] = value;
    setLocalSurvey({ ...localSurvey, questions: newQuestions });
  };

  const onSubmit = () => {
    openAPI.post("/api/survey/add", localSurvey).then((res) => {
        console.log(res)
      if (res.data.success) {
        setLocalSurvey(null);
        alert(res.data.msg);
        history.push("/surveys");
      }
    });
  };

  if (!localSurvey) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <Typography variant="h4">{localSurvey.title}</Typography>
      <Box mt={5} />
      <ShortAnswer
        localSurvey={localSurvey}
        onChange={onChangeValueShortAnswer}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Survey;
