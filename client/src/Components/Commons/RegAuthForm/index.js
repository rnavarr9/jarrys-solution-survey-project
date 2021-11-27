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
    email: "",
  });
  const history = useHistory();

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

      {!login ? (
        <div>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            required
            onChange={onChangeValue}
            value={credentials.email}
          />
        </div>
      ) : null}

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
