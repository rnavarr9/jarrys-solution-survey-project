import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const DisplayUser = () => {
  const { id } = useParams();
  const [localUser, setLocalUser] = useState(null);

  useEffect(() => {
    if (user === null) {
      renderUser();
    }
  }, []);

  const renderUser = () => {
    if (id) {
      axios
        .get(`/users/${id}`)
        .then((response) => {
          console.log({res: response.data})
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
