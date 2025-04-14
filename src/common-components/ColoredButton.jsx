import React from "react";

const ColoredButton = ({ name, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className="py-1 px-3 border border-blue unset flex items-center gap-2 rounded-[10px] shadow bg-blue text-white font-Poppins font-[10px]"
    >
      {icon && icon}
      {name}
    </button>
  );
};

export default ColoredButton;
