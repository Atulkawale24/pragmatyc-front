import React from "react";

const TransparentButton = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-3 border border-blue unset rounded-[10px] shadow text-blue font-Poppins font-[10px]"
    >
      {name}
    </button>
  );
};

export default TransparentButton;
