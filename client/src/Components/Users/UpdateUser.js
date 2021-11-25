import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const UpdateUser = () => {
  const [localUser, setLocalUser] = useState(null);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    renderUser();
  }, []);

  const renderUser = () => {
    axios
      .get(`/api/users/update/${id}`)
      .then((res) => {
        console.log({user:res.data.user})
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
      .post(`/api/users/update/${id}`, localUser)
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
    <div>
      <h1>Update User page</h1>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={localUser.name}
          onChange={onChangeValue}
        />
      </div>
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
          type="text"
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
    </div>
  );
};

export default UpdateUser;
