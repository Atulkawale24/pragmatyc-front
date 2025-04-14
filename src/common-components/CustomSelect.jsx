"use client";
import React from "react";
import Select from "react-select";

const CustomSelect = ({
  placeholder,
  options,
  value,
  onChange,
  isMulti = false,
  disabled = false,
  width = "auto",
}) => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "10px",
      height: "35px",
      width: width,
      borderColor: state.isFocused ? "#ccc" : "#ccc",
      boxShadow: state.isFocused ? "none" : "none",
      display: "flex",
      textAlign: "start",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#6c63ff"
        : state.isFocused
        ? "#f0f0ff"
        : null,
      color: state.isSelected ? "#fff" : "#333",
      "&:hover": {
        backgroundColor: "#e0e0ff",
      },
      textAlign: "start",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#6c63ff",
      color: "#fff",
      borderRadius: "10px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#fff",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#fff",
      "&:hover": {
        backgroundColor: "#4444ff",
        color: "#fff",
      },
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 8px",
      color: "#5C5F62",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#ccc",
      textAlign: "start",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: "start",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#999",
      "&:hover": {
        color: "#666",
      },
    }),
  };

  return (
    <Select
      className="reactSelect"
    //   isClearable
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
      styles={customStyles}
      isDisabled={disabled}
    />
  );
};

export default CustomSelect;
