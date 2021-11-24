import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserList from "./UserList";

const Users = () => {
const [users, setUsers] = useState(null)

  useEffect(() => {
    renderUsers();
  }, []);

  const renderUsers = () => {
    axios
      .get(`/users/list`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

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

  if (!users) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <h2>Users Table</h2>
      <Link to="/createUser">
        <button>AddUser</button>
      </Link>
      <UserList users={users} deleteUser={handleDeleteUser}/>
    </div>
  );
};

export default Users;
export {default as DisplayUser } from "./DisplayUser";
export {default as CreateUser } from "./CreateUser";
export {default as UpdateUser } from "./UpdateUser";
