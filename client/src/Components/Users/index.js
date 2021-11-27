import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserList from "./UserList";
import Store from "../../Contexts/Store";

const Users = () => {
const [users, setUsers] = useState(null)
const { handleBgColor } = useContext(Store);

  useEffect(() => {
    handleBgColor("white")
    renderUsers();
  }, []);

  const renderUsers = () => {
    axios
      .get(`/api/users`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("ERR", err);
      });
  };

  const handleDeleteUser = async (id) => {
    await axios
      .get(`/api/users/delete/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("User deleted!");
      })
      .catch((err) => {
        console.log("ERR", err);
      });
    axios
      .get(`/api/users`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
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
      <h2>Users Profile</h2>
      {/* <Link to="/createUser">
        <button>AddUser</button>
      </Link> */}
      <UserList users={users} deleteUser={handleDeleteUser}/>
    </div>
  );
};

export default Users;
export {default as DisplayUser } from "./DisplayUser";
export {default as CreateUser } from "./CreateUser";
export {default as UpdateUser } from "./UpdateUser";
