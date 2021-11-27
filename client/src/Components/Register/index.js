import React, { useContext, useEffect } from "react";
import Store from "../../Contexts/Store";
import { RegAuthForm } from "../Commons";

const Register = () => {
  const { handleBgColor } = useContext(Store);

  useEffect(() => {
    handleBgColor("black");
  }, []);
  return (
    <div>
      <RegAuthForm />
    </div>
  );
};

export default Register;
