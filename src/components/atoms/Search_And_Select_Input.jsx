"use client";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "@/components/ui/badge";

const customValueRenderer = (selected, _options) => {
  return selected.length
    ? selected.map(({ label, key }) => (
        <Badge
          key={key}
          className={
            "mr-2 text-[#4285f4] hover:bg-[#04080d] border-[0.2px] border-[#4285f4] bg-[#0d192c]"
          }
        >
          {label}
        </Badge>
      ))
    : "";
};

const DefaultItemRenderer = ({ checked, option, onClick, disabled }) => {
  return (
    <div
      className={`item-renderer flex gap-2 items-center ${
        disabled ? "disabled" : ""
      }`}
    >
      <Checkbox
        id="select-item"
        onCheckedChange={onClick}
        disabled={disabled}
        checked={checked}
        tabIndex={-1}
      />
      <span className=" text-sm">{option.label}</span>
    </div>
  );
};

function Search_And_Select_Input({
  title,
  isRequired,
  className,
  options,
  isCreatable,
  field,
}) {
  return (
    <div className={` mt-4 ${className}`}>
      <label className=" text-sm  lg:text-base" htmlFor={title}>
        {title}
        {isRequired && <span className=" text-red-400">*</span>}
      </label>
      <MultiSelect
        {...field}
        isCreatable={isCreatable}
        className="dark"
        options={options}
        ItemRenderer={DefaultItemRenderer}
        valueRenderer={customValueRenderer}
        labelledBy="Select"
      />
    </div>
  );
}

export default Search_And_Select_Input;
