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
  Surveys,
} from "./Components";
import { Spacing } from "./Components/Commons";
import { Survey } from "./Components/Surveys";
import {
  DisplaySurveyTemplate,
  UpdateSurveyTemplate,
  CreateSurveyTemplate,
} from "./Components/SurveyTemplates";
import { CreateUser, DisplayUser, UpdateUser } from "./Components/Users";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./Contexts/Auth";
import { StoreProvider } from "./Contexts/Store";

import axios from "axios";

function App() {
  const [auth, setAuth] = useState(null);
  const [bgColor, setBgColor] = useState("unset");

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
  const handleBgColor = (colorString) => {
    setBgColor(colorString);
  };

  if (auth === null) {
    return <div>...Loading</div>;
  }

  return (
    <AuthProvider value={{ auth, setAuth, handleLogout }}>
      <StoreProvider value={{ handleBgColor }}>
        <div
          style={{
            position: "absolute",
            backgroundColor: bgColor,
            height: "100vh",
            width: "100vw",
            zIndex: -10,
          }}
        ></div>
        <Router>
          <NavBarMenu />
          <Spacing paddingTop={"7em"} />
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/surveys" component={Surveys} />
            <ProtectedRoute path="/users" component={Users} />
            <ProtectedRoute path="/displayUser/:id" component={DisplayUser} />
            <ProtectedRoute path="/createUser" component={CreateUser} />
            <ProtectedRoute path="/updateUser/:id" component={UpdateUser} />
            <ProtectedRoute
              path="/surveyTemplates"
              component={SurveyTemplates}
            />
            <ProtectedRoute
              path="/displaySurveyTemplate/:id"
              component={DisplaySurveyTemplate}
            />
            <ProtectedRoute
              path="/updateSurveyTemplate/:id"
              component={UpdateSurveyTemplate}
            />
            <ProtectedRoute
              path="/createSurveyTemplate"
              component={CreateSurveyTemplate}
            />
            <Route path="/survey/:id" component={Survey} />
            <Route path="/" component={auth ? Surveys : Login} />
          </Switch>
        </Router>
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;
