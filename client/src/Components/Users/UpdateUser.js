import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Wrapper } from "../Commons";
import { Box, Typography } from "@mui/material";

const UpdateUser = () => {
  const [localUser, setLocalUser] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    renderUser();
  }, []);

  const renderUser = () => {
    axios
      .get(`/api/users/update/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log({ user: res.data.user });
        setLocalUser(res.data.user);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setLocalUser({ ...localUser, [name]: value });
  };

  const handleSaveUser = () => {
    axios
      .post(`/api/users/update/${id}`, localUser, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("User updated successfully!");
        history.push("/users");
      })
      .catch((err) => {
        console.log("Error saving user", err);
      });
  };

  if (!localUser) {
    return <div>...Loading</div>;
  }

  return (
    <Wrapper>
      <Typography variant="h4">Update User page</Typography>
      <Box pt={2}/>
      {/* <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={localUser.name}
          onChange={onChangeValue}
        />
      </div> */}
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={localUser.username}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={localUser.email}
          onChange={onChangeValue}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={localUser.password}
          onChange={onChangeValue}
        />
      </div>
      <br />
      <button onClick={handleSaveUser}>Save User</button>{" "}
      <Link to="/users">
        <button>Back</button>
      </Link>
    </Wrapper>
  );
};

export default UpdateUser;
