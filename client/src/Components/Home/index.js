import React, { useContext, useEffect } from "react";
import Store from "../../Contexts/Store";
const Home = () => {
  const { handleBgColor } = useContext(Store);

  useEffect(() => {
    handleBgColor("white");
  }, []);
  return <div>This is home page</div>;
};

export default Home;
