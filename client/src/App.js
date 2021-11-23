import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Home,
  Surveys,
  Users,
  Login,
  Register,
  ProtectedRoute,
  NavBarMenu,
} from "./Components";
import {
  DisplaySurvey,
  UpdateSurvey,
  CreateSurvey,
} from "./Components/Surveys";
import { CreateUser, DisplayUser, UpdateUser } from "./Components/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/Auth";

import axios from "axios";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    userAuthenticated();
  }, []);

  const userAuthenticated = () => {
    axios
      .get("/isUserAuth", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => setAuth(response.data.auth));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <AuthProvider value={{ auth, setAuth, handleLogout }}>
      <Router>
        <NavBarMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute path="/users" component={Users} />
          <ProtectedRoute path="/displayUser/:id" component={DisplayUser} />
          <ProtectedRoute path="/createUser" component={CreateUser} />
          <ProtectedRoute path="/updateUser/:id" component={UpdateUser} />
          <Route path="/surveys" component={Surveys} />
          <Route path="/displaySurvey/:id" component={DisplaySurvey} />
          <ProtectedRoute path="/updateSurvey/:id" component={UpdateSurvey} />
          <ProtectedRoute path="/createSurvey" component={CreateSurvey} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
