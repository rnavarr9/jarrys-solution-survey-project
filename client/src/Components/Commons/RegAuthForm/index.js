import React, { useState, useContext } from "react";
import { regAuth } from "../../../Helpers/copies";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Auth from "../../../Contexts/Auth";

const RegAuthForm = ({ login }) => {
  const { setAuth } = useContext(Auth);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    axios.post("/login", credentials).then((response) => {
      if (!response.data.auth) {
        console.log("auth failed");
      } else {
        setAuth(response.data.auth);
        localStorage.setItem("token", response.data.token);
        history.push("/home");
      }
    });
  };

  const handleRegister = () => {
    axios
      .post("/register", credentials)
      .then((res) => {
        console.log("user registered!", res);
        history.push("/surveys");
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  return (
    <div>
      <h1>{login ? regAuth.loginLabel : regAuth.registerLabel} Form</h1>
      <div>
        <label htmlFor="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
          onChange={onChangeValue}
          value={credentials.username}
        />
      </div>

      <div>
        <label htmlFor="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          onChange={onChangeValue}
          value={credentials.password}
        />
      </div>

      <p>
        {login ? regAuth.noAccount : regAuth.hasAccount}
        <Link to={login ? regAuth.toRegister : regAuth.toLogin}>
          click here
        </Link>
      </p>
      <button onClick={login ? handleLogin : handleRegister}>
        {login ? regAuth.loginLabel : regAuth.registerLabel}
      </button>
    </div>
  );
};

export default RegAuthForm;
