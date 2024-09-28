"use client";
import { cn } from "@/lib/utils";
import { useState, forwardRef } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = forwardRef(({ className, type, isPrice, ...props }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className=" flex relative w-full items-center">
      {isPrice && (
        <div className="absolute lg:cursor-pointer right-0 w-[50px] text-xl h-full flex flex-col justify-center items-center">
          $
        </div>
      )}
      {type === "password" && (
        <div
          onClick={() => setIsVisible(!isVisible)}
          className="absolute lg:cursor-pointer right-0 w-[50px]  h-full flex flex-col justify-center items-center"
        >
          {isVisible ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
      <input
        type={type === "password" ? (isVisible ? "text" : "password") : type}
        className={cn(
          "flex h-12 xl:h-14 font-league placeholder:text-slate-500 w-full rounded border border-glassBorder bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium  focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

export { Input };
