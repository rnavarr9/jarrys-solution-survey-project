import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Home,
  Surveys,
  Users,
  Login,
  Register,
  // ProtectedRoute,
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

import axios from "axios"

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

  return (
    <AuthProvider value={{auth, setAuth}}>
      <Router>
        <NavBarMenu />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/users" component={Users} />
          <Route path="/displayUser/:id" component={DisplayUser} />
          <Route path="/createUser" component={CreateUser} />
          <Route path="/updateUser/:id" component={UpdateUser} />
          <Route path="/surveys" component={Surveys} />
          <Route path="/displaySurvey/:id" component={DisplaySurvey} />
          <Route path="/updateSurvey/:id" component={UpdateSurvey} />
          <Route path="/createSurvey" component={CreateSurvey} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
