"use client";
import { usePathname } from "next/navigation";
import React from "react";
import navlist from "../../../json/navlist.json";
import { cn } from "@/lib/utils";

function Navbar() {
  const pathname = usePathname();
  return (
    <div>
      {/* Desktop Navbar */}
      <nav className="  hidden lg:flex items-center gap-8">
        {navlist.map((item, index) => (
          <a
            className={cn(
              pathname === item.route ? "text-white" : "text-gray-200",
              "text-center flex group flex-col relative text-base justify-center font-normal  hover:text-white hover:text-primary transition-all ease-in-out animdurat items-center"
            )}
            key={index}
            href={item.route}
          >
            {item.title === "Submit A tool" && (
              <div className="absolute -top-3 -right-3 rotate-12 ">
                <div className="text-black  relative z-[1000] bg-gradient-to-r from-primary to-greeny px-2 rounded-full text-[10px] font-medium">
                  <p> Free</p>
                </div>
                <div className="text-black bg-gradient-to-r blur-md from-primary w-8 absolute top-0 h-3 to-greeny px-2 rounded-full text-[10px] font-medium"></div>
              </div>
            )}
            {item.title}
            {pathname === item.route && (
              <div className="w-5 h-1 group-hover:bg-primary bg-white rounded-full" />
            )}
          </a>
        ))}
      </nav>
    </div>
  );
}

export default Navbar;
