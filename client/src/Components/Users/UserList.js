import React from "react";
import { Link } from "react-router-dom";

const UserList = ({ users, deleteUser }) => {
console.log({users})
  if (users === null || !users.length) {
    return <div>No users have been created</div>;
  }

  return (
    <>
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
                  <Link to={`/displayUser/${user._id}`}>
                    <button>Show</button>
                  </Link>
                  <td>
                    <Link to={`/updateUser/${user._id}`}>
                      <button>Update</button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={(e) => deleteUser(user._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
