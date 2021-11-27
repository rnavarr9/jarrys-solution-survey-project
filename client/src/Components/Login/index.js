import React, { useContext, useEffect } from "react";
import { RegAuthForm, Spacing } from "../Commons";
import Store from "../../Contexts/Store";
import { Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  spacing: {
    marginTop: "5em",
  },
}));

const Login = () => {
  const { handleBgColor } = useContext(Store);
  const classes = useStyles();

  useEffect(() => {
    handleBgColor("#202020");
  }, []);

  return (
    <Grid container>
      <Grid container item xs={6}>
        <Grid container direction="column" alignItems="center">
          <Spacing paddingTop={"3em"} />
          <Typography color="white" variant="h2">
            Welcome to
            <br />
            Jarry's solution
          </Typography>
          <Box className={classes.spacing} />
          <Typography color="white" variant="h4">
            Let's create
            <br /> your own Survey!
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <RegAuthForm login />
      </Grid>
    </Grid>
  );
};

export default Login;
