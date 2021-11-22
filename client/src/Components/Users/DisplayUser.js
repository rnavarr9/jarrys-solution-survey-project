import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const DisplayUser = ({ user }) => {
//   const { id } = useParams();
  const [localUser, setLocalUser] = useState(user);

  useEffect(() => {
    if (user === null) {
      renderUser();
    }
  }, []);

//   const renderUser = () => {
//     if (id) {
//       axios
//         .get(`/users/${id}`)
//         .then((response) => {
//           setLocalUser(response.data);
//         })
//         .catch((err) => {
//           console.log("Error fetching user!");
//         });
//     }
//   };

  return (
    <>
      <h1>User Profile</h1>

      <label>Name</label>
      <h5>{localUser.name}</h5>
      <label>Username</label>
      <h5>{localUser.username}</h5>
      <label>Email</label>
      <h5>{localUser.email}</h5>
    </>
  );
};

export default DisplayUser;
