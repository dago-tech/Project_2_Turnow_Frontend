import React from "react";
import "./Loader.css";

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
