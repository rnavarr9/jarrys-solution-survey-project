import React, { useContext, useEffect } from "react";
import { RegAuthForm } from "../Commons";
import Store from "../../Contexts/Store";

const Login = () => {
  const { handleBgColor } = useContext(Store);

  useEffect(() => {
    handleBgColor("black");
  }, []);
  return (
    <div>
      <RegAuthForm login />
    </div>
  );
};

export default Login;
