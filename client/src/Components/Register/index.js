import React, { useContext, useEffect } from "react";
import Store from "../../Contexts/Store";
import { RegAuthForm, Spacing } from "../Commons";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Wrapper } from "../Commons";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "5em",
  },
}));

const Register = () => {
  const { handleBgColor } = useContext(Store);
  const classes = useStyles();

  useEffect(() => {
    handleBgColor("#202020");
  }, []);
  return (
    <Wrapper>
      <Grid container display="flex" justifyContent="space-around">
        <Grid container item xs={6}>
          <Grid
            container
            direction="column"
            alignItems="left"
            sx={{ ml: "5em" }}
          >
            <Spacing paddingTop={"3em"} />
            <Typography color="white" variant="h3">
              Welcome to
              <br />
              Jarry's solution
            </Typography>
            <Box className={classes.spacing} />
            <Typography color="white" variant="h5">
              Join us
              <br /> and enjoy the benefits!
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <RegAuthForm />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default Register;
