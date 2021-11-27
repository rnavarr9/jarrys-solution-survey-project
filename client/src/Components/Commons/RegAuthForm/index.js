import React, { useState, useContext } from "react";
import { regAuth } from "../../../Helpers/copies";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Auth from "../../../Contexts/Auth";
import { Card, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // maxHeight: "100%",
    // overflowY: "auto",
    // maxWidth: "100%",
  },
  card: {
    padding: "1em",
    maxWidth: "350px",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  spacing: {
    padding: "1em 0",
  },
}));

const RegAuthForm = ({ login }) => {
  const { setAuth } = useContext(Auth);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
  });
  const history = useHistory();
  const classes = useStyles();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    axios.post("/api/login", credentials).then((response) => {
      if (!response.data.auth) {
        alert(response.data.msg);
      } else {
        localStorage.setItem("token", response.data.token);
        setAuth(response.data.auth);
        alert(`Welcome, ${credentials.username}`);
        history.push("/");
      }
    });
  };

  const handleRegister = () => {
    axios
      .post("/api/register", credentials)
      .then((response) => {
        if (!response.data.auth) {
          alert(response.data.msg);
        } else {
          localStorage.setItem("token", response.data.token);
          setAuth(response.data.auth);
          alert(response.data.msg);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  return (
    <Card elevation={3} className={clsx(classes.card, classes.actions)}>
      <Typography align="center" variant="h4">
        {login ? regAuth.loginLabel : regAuth.registerLabel} Form
      </Typography>
      <Typography variant="h6" className={classes.spacing}>
        <b>Username</b>
      </Typography>
      <TextField
        type="text"
        placeholder="Enter Username"
        name="username"
        required
        onChange={onChangeValue}
        value={credentials.username}
      />

      {login ? null : (
        <>
          <Typography variant="h6" className={classes.spacing}>
            <b>Email</b>
          </Typography>
          <TextField
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={onChangeValue}
            value={credentials.email}
          />
        </>
      )}

      <Typography variant="h6" className={classes.spacing}>
        <b>Password</b>
      </Typography>
      <TextField
        type="password"
        placeholder="Enter Password"
        name="password"
        required
        onChange={onChangeValue}
        value={credentials.password}
      />

      <Typography align="center" className={classes.spacing}>
        {login ? regAuth.noAccount : regAuth.hasAccount}
        <Link to={login ? regAuth.toRegister : regAuth.toLogin}>
          click here
        </Link>
      </Typography>

      <Button
        variant="contained"
        onClick={login ? handleLogin : handleRegister}
      >
        {login ? regAuth.loginLabel : regAuth.registerLabel}
      </Button>
    </Card>
  );
};

export default RegAuthForm;
