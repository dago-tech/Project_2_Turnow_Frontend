import React from "react";


const Message = ({ msg }) => {
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#b40000",
    fontWeight: "bold",
  };

  return (
    <div style={styles}>
      <p dangerouslySetInnerHTML={{ __html: msg }} />
    </div>
  );
};

export default Message;