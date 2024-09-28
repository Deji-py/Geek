import { Badge } from "@/components/ui/badge";
import React from "react";

function Pricing_Card({ item }) {
  return (
    <div className=" bg-secondary/50 p-3 mt-2 rounded-md border border-glassBorder">
      <div className=" flex items-center w-full justify-between">
        <Badge
          className={
            " text-sm h-7 rounded-full bg-gradient-to-r text-black from-primary to-greeny"
          }
        >
          {item?.package_name}
        </Badge>
        <div className=" flex gap-2 items-center">
          <h2 className=" text-2xl ">
            {item?.Pricing} <sup className=" text-lg ">$</sup>
          </h2>
          <p>/{item?.timeline}</p>
        </div>
      </div>
      <div className="w-full gap-x-3 mt-4 text-gray-300 text-xs  flex  flex-wrap items-start">
        {item?.features.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}

export default Pricing_Card;
