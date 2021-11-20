import React, { useState, useEffect } from "react";
import {users as fakeUsers} from "./fakeUsers";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([...fakeUsers]);

  // useEffect(() => {
  //   renderUsers();
  // }, []);
  // const renderUsers = () => {
  //   axios
  //     .get(`/users`)
  //     .then((res) => {
  //       setUsers(res.data);
  //     })
  //     .catch((err) => {
  //       console.log("ERR", err);
  //     });
  // };

  const handleDeleteUser = async (id) => {
    await axios
      .get(`/users/delete/${id}`)
      .then((res) => {
        console.log("User deleted!");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    axios
      .get(`/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  return (
    <div>
      <h2>Users Table</h2>
      <Link to="/createUser">
        <button>AddUser</button>
      </Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length
            ? users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button disabled>Show</button>
                  </td>
                  <td>
                    <Link to={`/updateUser/${user._id}`}>
                      <button>Update</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={(e) => handleDeleteUser(user._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
