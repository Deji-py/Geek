"use client";
import React, { Suspense, useState } from "react";
import SearchBox from "../shared/SearchBox";
import SearchResult from "./SearchResult";
import TopSearches from "../homepage/TopSearches";
import SearchText from "./SearchText";

function SearchHero() {
  const [result, setResult] = useState(null);

  return (
    <>
      <section className="w-full  max-w-7xl  relative   flex flex-col justify-center items-center ">
        <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
        <div className=" lg:h-[15rem] rounded-full   w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>

        <div className=" bg-gradient-to-t  w-full relative from-secondary border-b-[0.5px] border-glassBorder backdrop-blur-lg to-transparent  px-3 lg:px-0  lg:pt-0 pt-8 flex flex-col justify-center  rounded-b-[20px] lg:rounded-b-[80px]  overflow-hidden items-center h-[350px] lg:h-[400px]">
          {/* <Image
          src={tools}
          className=" absolute w-28 lg:w-36 -bottom-3 lg:bottom-2 lg:right-2 -right-4"
        /> */}

          <div className="w-full mb-8 lg:mb-0 max-w-3xl mt-5 px-2">
            <Suspense>
              <SearchText setResult={setResult} />
              <SearchBox />
            </Suspense>
          </div>
        </div>
      </section>
      <TopSearches />
      <SearchResult result={result} />
    </>
  );
}

export default SearchHero;
