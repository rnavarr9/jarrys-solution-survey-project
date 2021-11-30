import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

const ShortAnswer = ({ localSurvey, onChange, onSubmit }) => {
  return (
    <div>
      {typeof localSurvey.questions === "object"
        ? localSurvey.questions.map((q, index) => (
            <div key={index}>
              <div>
                <Typography id={index} name="question">
                  {`${index + 1} - ${q.question}`}
                </Typography>
                <Box mt={1} />
                <TextField
                  multiline
                  id={index}
                  name="answer"
                  value={q.answer}
                  onChange={(e) => onChange(e, index)}
                />
                <Box mt={4} />
              </div>
            </div>
          ))
        : null}
      <Button variant="contained" onClick={onSubmit}>
        Send Survey
      </Button>
    </div>
  );
};

export default ShortAnswer;
