import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import React from "react";
import { RiCheckboxCircleFill } from "react-icons/ri";

function Pricing({
  title,
  price,
  list,
  recommended,
  timeline,
  former_price,
  isDark,
  isSelected,
  selectThis,
  className,
  onClick,
  loading,
}) {
  return (
    <div
      onClick={selectThis}
      className={cn(
        isDark ? " glassmorphism" : "bg-[#0A50FF] svg_glow",
        "w-full rounded-2xl    transition-all cursor-pointer ease-in-out animdurat relative  p-6 shadow-xl flex-1 flex flex-col ",
        className
      )}
    >
      <div className=" absolute top-4 right-4">
        {!isSelected ? (
          <Circle size={18} />
        ) : (
          <RiCheckboxCircleFill size={20} />
        )}
      </div>
      <div className="mb-4 flex flex-col items-start justify-between gap-4 lg:flex-row">
        <div className=" text-center w-full">
          {recommended && (
            <span className="order-first mb-2 bg-[#FEFFC1]  text-[#A23310] inline-block rounded-full   px-2 py-0.5  text-[10px] font-semibold uppercase tracking-wider  lg:order-none">
              Recommended
            </span>
          )}
          <h3 className="text-xl font-semibold text-white lg::text-3xl">
            {title}
          </h3>
          <p className="text-indigo-100">{timeline}</p>
        </div>
      </div>

      <div className="mb-4 space-x-2  flex  items-center justify-center text-center w-full">
        {former_price && (
          <span className="text-2xl text-indigo-100 line-through">
            ${former_price}
          </span>
        )}
        <span className="text-4xl flex items-start justify-center font-mebium text-white">
          {price}
          <sup className="text-sm">$</sup>
        </span>
      </div>

      <ul className="mb-6 flex-1 pt-5 border-t-[0.5px] border-t-[rgba(255,255,255,0.06)] space-y-2 text-indigo-100">
        {list.map((item, index) => (
          <li
            key={index}
            className="flex items-center text-sm lg:text-xs gap-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>

            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="w-full relative mt-10 flex flex-col justify-center items-center">
        {loading && <div className=" z-10 loader absolute  " />}
        <Button
          onClick={onClick}
          className={cn(
            isDark
              ? "glassmorphism  hover:bg-secondary/30 hover:border-[rgba(45,49,54,0.36)]"
              : "bg-[rgba(8,9,10,0.36)] hover:bg-[rgba(8,9,10,0.5)] border border-transparent hover:border-[rgba(45,49,54,0.36)]",
            "py-2 flex items-center w-full  text-base font-normal  px-3 justify-center gap-5"
          )}
        >
          Choose this plan
        </Button>
      </div>
    </div>
  );
}

export default Pricing;
