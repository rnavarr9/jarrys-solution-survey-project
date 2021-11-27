import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Contexts/Auth";

const NavBarMenuAuth = ({ handleLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/users">Profile</Link>
        </li>
        <li>
          <Link to="/surveyTemplates">Survey Templates</Link>
        </li>
        <li>
          <Link to="/home" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const NavBarMenuNoAuth = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
  );
};

const NavBarMenu = () => {
  const { auth, handleLogout } = useContext(Auth);
  if (auth) {
    return <NavBarMenuAuth handleLogout={handleLogout} />;
  }
  return <NavBarMenuNoAuth />;
};

export default NavBarMenu;
