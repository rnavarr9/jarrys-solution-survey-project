import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Auth from "../../Contexts/Auth";
import { AppBar, Button, Typography } from "@mui/material";

const NavBarMenuAuth = ({ handleLogout }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/">
          <Button color="inherit">
            <Typography color="white">Home</Typography>
          </Button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/users">
          <Button color="inherit">
            <Typography color="white">Profile</Typography>
          </Button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/surveyTemplates">
          <Button color="inherit">
            <Typography color="white">Survey Templates</Typography>
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/home" onClick={handleLogout}>
          <Button color="inherit">
            <Typography color="white">Log out</Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NavBarMenuNoAuth = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/surveys">
          <Button>
            <Typography color="white">Surveys</Typography>
          </Button>
        </Link>
      </div>
      <div>
        <Link style={{ textDecoration: 'none' }} to="/login">
          <Button>
            <Typography color="white">Login</Typography>
          </Button>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/register">
          <Button>
            <Typography color="white">Register</Typography>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NavBarMenu = () => {
  const { auth, handleLogout } = useContext(Auth);

  return (
    <AppBar style={{padding: ".5em 0 "}}>
      {auth ? (
        <NavBarMenuAuth handleLogout={handleLogout} />
      ) : (
        <NavBarMenuNoAuth />
      )}
    </AppBar>
  );
};

export default NavBarMenu;
