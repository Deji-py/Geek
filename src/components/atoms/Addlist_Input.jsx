import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

function Addlist_Input({
  title,
  placeholder,
  type,
  isRequired,
  className,
  field,
  max,
  list,
  setList,
}) {
  const [feature, setFeature] = useState("");

  const addToList = () => {
    if (feature.trim() !== "") {
      if (max) {
        if (list?.length < max) {
          setList((list) => [...list, feature]);
          setFeature("");
        }
      } else {
        setList((list) => [...list, feature]);
        setFeature("");
      }
    }
  };

  const deleteItem = (item) => {
    setList((list) => list.filter((value) => value !== item));
  };

  return (
    <div className={` mt-4 ${className}`}>
      <div className=" flex items-center justify-between">
        <label className=" text-sm  lg:text-base" htmlFor={title}>
          {title}
          {isRequired && <span className="   text-red-400">*</span>}
        </label>
        <p
          className={cn(
            list?.length > max ? "text-red-500" : "text-gray-400",
            "text-xs"
          )}
        >
          {max && (
            <div>
              {list?.length} / {max}
            </div>
          )}
        </p>
      </div>
      <div className=" relative h-10 border border-glassBorder bg-transparent px-1  rounded flex items-center">
        <Input
          onChange={(e) => setFeature(e.target.value)}
          className="flex-1 h-5  border-none  focus:bg-transparent"
          {...field}
          value={feature}
          required={isRequired}
          type={type}
          placeholder={placeholder}
        />
        <Button
          onClick={addToList}
          className=" right-1 h-8 gap-2  px-4  glassmorphism  hover:bg-glassBorder/50 "
        >
          Add <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className=" flex items-center gap-2 pt-2 flex-wrap">
        {list?.map((item, key) => (
          <Badge
            className={
              "right-1 h-8 gap-2  rounded-none px-2  glassmorphism  hover:bg-glassBorder/50"
            }
            key={key}
          >
            {item}
            <X
              onClick={() => deleteItem(item)}
              className="w-4 hover:scale-[1.2] transition-all ease-in-out cursor-pointer"
            />
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default Addlist_Input;
