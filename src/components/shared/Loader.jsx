import React from "react";
import "../../styles/loader.css";

const Loader = () => {
  /*Containers used to create a Loading animation */
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
