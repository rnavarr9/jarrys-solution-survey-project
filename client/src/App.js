import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Home,
  SurveyTemplates,
  Users,
  Login,
  Register,
  ProtectedRoute,
  NavBarMenu,
  Surveys
} from "./Components";
import {
  DisplaySurveyTemplate,
  UpdateSurveyTemplate,
  CreateSurveyTemplate,
} from "./Components/SurveyTemplates";
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
      .get("/api/isUserAuth", {
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

  if(auth === null) {
    return <div>...Loading</div>
  }

  return (
    <AuthProvider value={{ auth, setAuth, handleLogout }}>
      <Router>
        <NavBarMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/surveys" component={Surveys} />
          <ProtectedRoute path="/users" component={Users} />
          <ProtectedRoute path="/displayUser/:id" component={DisplayUser} />
          <ProtectedRoute path="/createUser" component={CreateUser} />
          <ProtectedRoute path="/updateUser/:id" component={UpdateUser} />
          <ProtectedRoute path="/surveyTemplates" component={SurveyTemplates} />
          <ProtectedRoute path="/displaySurveyTemplate/:id" component={DisplaySurveyTemplate} />
          <ProtectedRoute path="/updateSurveyTemplate/:id" component={UpdateSurveyTemplate} />
          <ProtectedRoute path="/createSurveyTemplate" component={CreateSurveyTemplate} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
