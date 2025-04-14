import React from "react";

const Label = ({ children }) => {
  return (
    <label
      className="font-Poppins text-black"
      style={{ fontSize: "15px" }}
    >
      {children}
    </label>
  );
};

export default Label;
