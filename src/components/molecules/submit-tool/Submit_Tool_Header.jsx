import React from "react";
import submit_tool from "../../../../public/images/svg/submit-tool.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Submit_Tool_Header = () => {
  return (
    <section className="w-full  max-w-7xl  relative   flex flex-col justify-center items-center ">
      <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className=" lg:h-[15rem] rounded-full   w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>

      <div className=" bg-gradient-to-t  w-full relative from-secondary border-b-[0.5px] border-glassBorder backdrop-blur-lg to-transparent  px-3 lg:px-0  lg:pt-0 pt-32 flex flex-col justify-center  rounded-b-[20px] lg:rounded-b-[80px]  overflow-hidden items-center h-[500px] lg:h-[450px]">
        <div className=" lg:flex-row flex-col flex items-center gap-20 px-2 lg:px-10">
          <div className=" flex-1 flex flex-col lg:items-start items-center w-full">
            <h1 className=" text-center lg:text-start  text-[2.3rem] leading-[2.5rem] lg:text-7xl font-semibold ">
              <span className="gradient_text">Your tool </span> deserves to be
              noticed!
            </h1>
            <p className=" mt-4 px-2 lg:px-0 text-[#c1cae0]  text-base lg:text-3xl lg:text-start text-center font-light max-w-3xl w-full ">
              {`Submit your tool today and let the world experience your innovation!`}
            </p>
            <a href="/login">
              <Button className="font-normal mt-5 right-1 h-11 lg:h-12 gap-2 lg:px-8 px-5 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-base lg:text-xl">
                Submit a Tool
              </Button>
            </a>
          </div>
          <Image
            src={submit_tool}
            alt="submit_tool"
            width={300}
            className="w-full lg:w-[45%] -mt-10 lg:mt-20"
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Submit_Tool_Header;
