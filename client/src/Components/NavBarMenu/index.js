import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Auth from "../../Contexts/Auth";

const NavBarMenuAuth = () => {
  return (
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
          <Link to="/login">Logout</Link>
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
  const {auth} = useContext(Auth);
  if (auth) {
    return <NavBarMenuAuth />;
  }
  return <NavBarMenuNoAuth />;
};

export default NavBarMenu;
