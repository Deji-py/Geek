import React from "react";
import { Textarea } from "@/components/ui/textarea";

function G_TextArea({
  title,
  placeholder,
  type,
  isRequired,
  className,
  inputClassName,
  field,
  max,
}) {
  return (
    <div className={` mt-4 h-full  ${className}`}>
      <div className=" flex items-center justify-between">
        <label className=" text-sm  lg:text-base" htmlFor={title}>
          {title}
          {isRequired && <span className="   text-red-400">*</span>}
        </label>
        <p className="text-xs  text-gray-400">Max: {max}</p>
      </div>
      <Textarea
        maxLength={max}
        required={isRequired}
        type={type}
        className={inputClassName}
        placeholder={placeholder}
        {...field}
      />
    </div>
  );
}

export default G_TextArea;
