import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";
import noImage from "../../../../public/images/png/no_img.png";

function CategoryItem({ item }) {
  return (
    <a className=" flex-none" href={`/search?query=${item.name}`}>
      <Badge
        className={
          " text-base group  rounded-lg flex-none lg:justify-center flex lg:flex-row flex-col-reverse cursor-pointer hover:bg-[#113daf] bg-[#0A50FF] lg:text-lg lg:flex-none  text-center   lg:h-12 h-20 lg:px-0 px-4 relative font-normal lg:pl-3   lg:pr-24"
        }
      >
        <p>{item.name}</p>
        <Image
          width={300}
          height={300}
          src={item?.image ? `${item.image}` : noImage}
          alt="logo"
          style={{
            width:
              item.name.includes("Designing") || item.name.includes("Code")
                ? 90
                : 80,
          }}
          className="lg:absolute transition-all lg:right-0"
        />
      </Badge>
    </a>
  );
}

export default CategoryItem;
