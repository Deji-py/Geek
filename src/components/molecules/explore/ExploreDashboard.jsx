"use client";
import React, { Suspense, useState } from "react";
import SearchBox from "../shared/SearchBox";

function ExploreHero() {
  return (
    <section className="w-full px-3  max-w-7xl   relative   flex flex-col justify-center items-center ">
      <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className=" lg:h-[15rem] rounded-full   w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>
      <div className=" bg-gradient-to-t  w-full relative from-secondary border-b-[0.5px] border-glassBorder backdrop-blur-lg to-transparent  px-3 lg:px-0  lg:pt-0 pt-0 flex flex-col justify-center  rounded-b-[20px] lg:rounded-b-[80px]  overflow-hidden items-center h-[400px] lg:h-[350px]">
        <div className=" max-w-4xl flex flex-col justify-center items-center">
          <h1 className=" text-center  text-3xl px-10  lg:text-5xl mb-1 lg:mb-2 font-semibold ">
            {`  Explore Amazing geektools categories`}
          </h1>
          <p className=" mt-4 px-2 lg:px-0 text-[#c1cae0] text-center text-base lg:text-lg font-light max-w-3xl w-full ">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
            placeat libero rem, neque alias ratione consectetur tenetur?
          </p>
          <div className="w-full mb-8 lg:mb-0 max-w-3xl mt-5 ">
            <Suspense>
              <SearchBox />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreHero;
