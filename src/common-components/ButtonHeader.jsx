import React from "react";
import buttonHeaderStyle from "../styles/buttonHeader.module.css";
import CustomSelect from "./CustomSelect";
import TransparentButton from "./TransparentButton";
import ColoredButton from "./ColoredButton";
import { CiFilter } from "react-icons/ci";

const ButtonHeader = ({ name, onClick, coloredButtonClick }) => {
  return (
    <div className={buttonHeaderStyle?.headerWrapper}>
      <ColoredButton name="Filter" icon={<CiFilter />} onClick={coloredButtonClick} />
      <TransparentButton name={name} onClick={onClick} />
    </div>
  );
};

export default ButtonHeader;
