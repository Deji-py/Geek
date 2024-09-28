"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";

function SelectInput({
  items,
  title,
  isRequired,
  className,
  placeholder,
  showSearch,
  selected,
  setSelected,
}) {
  const [value, setValue] = useState(items);

  useEffect(() => {
    setValue(items);
  }, [items]);

  return (
    <div className={`mt-4 ${className}`}>
      <label className="text-sm lg:text-base" htmlFor={title}>
        {title}
        {isRequired && <span className="text-red-400">*</span>}
      </label>
      <Select
        value={selected?.name}
        onValueChange={(value) =>
          setSelected(items.find((item) => item.name === value))
        }
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder}>
            <div className=" !flex items-center gap-2">
              {selected && selected?.code && (
                <img
                  className="w-6"
                  src={`https://flagcdn.com/${selected.code?.toLowerCase()}.svg`}
                />
              )}
              <p>{selected?.name || placeholder}</p>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {showSearch && (
            <Input
              onChange={(e) =>
                e.target.value === ""
                  ? setValue(items)
                  : setValue(
                      items?.filter((item) =>
                        item.name
                          ?.toLowerCase()
                          ?.includes(e.target.value.toLowerCase())
                      )
                    )
              }
              placeholder={"Search"}
              className={"mb-2"}
            />
          )}
          {value?.map((item, index) => (
            <SelectItem hideIndicator key={index} value={item?.name}>
              <div className="flex items-center text-start gap-2">
                {item.code && (
                  <img
                    className="w-6"
                    src={`https://flagcdn.com/${item.code.toLowerCase()}.svg`}
                  />
                )}
                {item.icon && item.icon}
                {item?.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectInput;
