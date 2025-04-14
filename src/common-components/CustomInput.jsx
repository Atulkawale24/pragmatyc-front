import React from "react";
import { Controller } from "react-hook-form";
import inputStyle from "../styles/commonComponent.module.css";
import Label from "./text-components/Label";

const CustomInput = ({
  name,
  rules,
  control,
  label,
  type = "text",
  placeholder,
  disabled,
  icon,
  onClick,
  trigger,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={inputStyle?.inputWrapper}>
          <Label>{label}</Label>
          <div className="relative mt-1.5 mb-0.5">
            <input
              onChange={onChange}
              onBlur={() => trigger(name)}
              type={type}
              value={value}
              placeholder={placeholder}
              disabled={disabled}
            />
            {icon && (
              <button
                onClick={onClick}
                className="unset absolute top-[50%] left-[95%]"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {icon}
              </button>
            )}
          </div>
          {error && (
            <span className={inputStyle?.errorText}>{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export default CustomInput;
