import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ShortAnswer = ({ localSurvey, onChange, onSubmit }) => {
  return (
    <Grid container>
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
      <Grid item xs={12} container>
        <Grid item xs={2}>
          <Button variant="contained" onClick={onSubmit}>
            Send Survey
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Link to="/surveys" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              Back to Surveys
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ShortAnswer;
