import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PricingPlanList({ data }) {
  return (
    <section className=" pb-10 px-3 relative -mt-5">
      <div className=" lg:h-[8rem] rounded-full   w-[6rem] h-[6rem] lg:w-[8rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>
      <div className=" flex items-center w-full px-4 lg:px-0 justify-between">
        <h3 className="lg:text-2xl text-xl relative w-fit flex items-center gap-2 py-3 font-semibold">
          Pricing Plan
        </h3>
        <div className=" flex items-center  right-0 top-0 gap-3">
          <div className="p-2 cursor-pointer  border-[0.2px]  hover:scale-[0.9] text-[#67738c]  hover:text-white transition-all border-[#1d212c]    bg-secondary">
            <ChevronLeft className="w-4 h-4" />
          </div>
          <div className="p-2 border-[#1d212c] group cursor-pointer text-[#67738c] hover:text-white hover:scale-[0.9] transition-all  bg-secondary border-[0.2px]">
            <ChevronRight className="w-4 h-4 " />
          </div>
        </div>
      </div>

      <div className="bg-[#17191C] max-w-[400px] p-3 mt-2 rounded-md border border-[#2E3238]">
        <div className=" flex items-center w-full justify-between">
          <Badge
            className={
              " bg-gradient-to-r text-black from-primary lg:text-lg font-semibold to-greeny"
            }
          >
            {data?.package_name}
          </Badge>
          <div className=" flex gap-2 items-center">
            <h2 className=" text-2xl ">
              {data?.Pricing} <sup className=" text-xs ">$</sup>
            </h2>
            <p>/{data?.timeline}</p>
          </div>
        </div>
        <div className="w-full gap-x-3 gap-y-2 mt-4 text-gray-300 text-sm  flex  flex-wrap items-start">
          {data?.features?.map((item, index) => (
            <p key={index} className=" flex items-center gap-2">
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
              {item}
            </p>
          ))}
        </div>
      </div>
      {/* <div className=" lg:flex-row flex-col flex px-3 lg:px-0 items-center gap-3 lg:gap-6">
        {data?.setup?.features.map((item, index) => (
          <div
            key={index}
            className="bg-[#17191C] p-3 mt-2 rounded-md border border-[#2E3238]"
          >
            <div className=" flex items-center w-full justify-between">
              <Badge
                className={
                  " bg-gradient-to-r text-black from-primary lg:text-lg font-semibold to-greeny"
                }
              >
                {item?.package_name}
              </Badge>
              <div className=" flex gap-2 items-center">
                <h2 className=" text-2xl ">
                  {item?.pricing} <sup className=" text-xs ">$</sup>
                </h2>
                <p>/{item?.timeline}</p>
              </div>
            </div>
            <div className="w-full gap-x-3 gap-y-2 mt-4 text-gray-300 text-sm  flex  flex-wrap items-start">
              {item?.features?.map((item, index) => {
                <p key={index} className=" flex items-center gap-2">
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
                  {item}
                </p>;
              })}
            </div>
          </div>
        ))}
      </div> */}
    </section>
  );
}

export default PricingPlanList;
