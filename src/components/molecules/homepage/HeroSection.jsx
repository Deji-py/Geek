"use client";
import React, { Suspense } from "react";
import tools from "../../../../public/images/png/tools.png";
import Image from "next/image";
import TextTyping from "../shared/TextTyping";
import SearchBox from "../shared/SearchBox";

function HeroSection() {
  return (
    <section className="w-full  max-w-7xl  relative   flex flex-col justify-center items-center ">
      <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className=" lg:h-[15rem] rounded-full   w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>
      <div className=" lg:h-[15rem] rounded-full lg:hidden  w-[6rem] h-[6rem] lg:w-[15rem] absolute right-0 top-0 lg:right-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>

      <div className=" bg-gradient-to-t  w-full relative from-secondary border-b-[0.5px] border-glassBorder backdrop-blur-lg to-transparent  px-3 lg:px-0  lg:pt-0 pt-8 flex flex-col justify-center  rounded-b-[20px] lg:rounded-b-[80px]  overflow-hidden items-center h-[420px] lg:h-[500px]">
        <Image
          src={tools}
          className=" absolute w-28 lg:w-40 -bottom-3 lg:bottom-0 lg:-right-2 -right-4"
        />

        <div>
          <h1 className=" text-center  text-[1.8rem] leading-[2.5rem] lg:text-7xl font-bold ">
            <span className="gradient_text">The Best Tools Directory </span> For
            <div className=" flex justify-center items-center gap-3">
              <TextTyping />
            </div>
          </h1>
          <p className=" mt-4 px-2 lg:px-0 text-[#c1cae0]  text-center text-base lg:text-xl font-light max-w-4xl w-full ">
            {`Geek.tools stands as an essential resource hub meticulously crafted for developers and designers alike`}
          </p>
        </div>
        <div className="w-full mb-8 lg:mb-0 max-w-3xl mt-5 lg:mt-8 px-2">
          <SearchBox />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
