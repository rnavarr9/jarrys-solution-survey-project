import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayUser = () => {
  const { id } = useParams();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    if (!localUser) {
      renderUser();
    }
  }, []);

  const renderUser = () => {
    if (id) {
      axios
        .get(`/api/users/${id}`)
        .then((response) => {
          setLocalUser(response.data);
        })
        .catch((err) => {
          console.log("Error fetching user!");
        });
    }
  };

  if (!localUser) {
    return <div>...Loading user data</div>;
  }

  return (
    <>
      <h1>User Profile</h1>

      <div style={{ display: "flex" }}>
        <label>
          <b>Name:</b>{" "}
        </label>
        <span>{localUser.name}</span>
      </div>

      <div style={{ display: "flex" }}>
        <label>
          <b>Username:</b>{" "}
        </label>
        <span>{localUser.username}</span>
      </div>

      <div style={{ display: "flex" }}>
        <label>
          <b>Email:</b>{" "}
        </label>
        <span>{localUser.email}</span>
      </div>
      <br />
      <Link to="/users">
        <button>Back</button>
      </Link>
    </>
  );
};

export default DisplayUser;
