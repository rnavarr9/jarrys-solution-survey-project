import "./App.css";
import React from "react";
import { Home, Surveys, Users, Login, Register } from "./Components";
import {
  DisplaySurvey,
  UpdateSurvey,
  CreateSurvey,
} from "./Components/Surveys";
import { CreateUser, DisplayUser, UpdateUser } from "./Components/Users";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/surveys">Surveys</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/displayUser/:id">
            <DisplayUser />
          </Route>
          <Route path="/createUser">
            <CreateUser />
          </Route>
          <Route path="/updateUser/:id">
            <UpdateUser />
          </Route>
          <Route path="/surveys">
            <Surveys />
          </Route>
          <Route path="/displaySurvey/:id">
            <DisplaySurvey />
          </Route>
          <Route path="/updateSurvey/:id">
            <UpdateSurvey />
          </Route>
          <Route path="/createSurvey">
            <CreateSurvey />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
