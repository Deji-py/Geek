import React from "react";
import { Input } from "../ui/input";

function TextInput({
  title,
  placeholder,
  type,
  isRequired,
  className,
  field,
  disabled,
  isPrice,
}) {
  return (
    <div className={` mt-4 ${className}`}>
      <label className=" text-sm  lg:text-base" htmlFor={title}>
        {title}
        {isRequired && <span className=" text-red-400">*</span>}
      </label>
      <Input
        disabled={disabled}
        {...field}
        required={isRequired}
        type={type}
        isPrice={isPrice}
        placeholder={placeholder}
      />
    </div>
  );
}

export default TextInput;
