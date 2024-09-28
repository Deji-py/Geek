import { Button } from "@/components/ui/button";
import React from "react";
import ctaTools from "../../../../public/images/png/ctaTools.png";
import tools from "../../../../public/images/png/tools.png";
import Image from "next/image";

function CtaSection() {
  return (
    <div className=" px-3 lg:px-0 pt-10 w-full flex justify-center items-center">
      <section className=" w-full relative max-w-6xl h-[350px] lg:h-[300px]  rounded-xl overflow-hidden bg-[#0A50FF]  flex  flex-col justify-center items-center mt-10 to-greeny">
        <Image
          src={ctaTools}
          className="w-full left-0 hidden lg:block  absolute bottom-0"
          alt="ctatools"
        />
        <Image
          src={tools}
          className=" w-40 -right-3 lg:hidden  absolute bottom-0"
          alt="tools"
        />
        <div className="w-full h-full bg-gradient-to-b  from-transparent via-transparent  absolute top-0 left-0 to-[#0A50FF]"></div>
        <div className=" items-center px-5 lg:px-0  relative text-center w-full flex-col justify-center flex">
          <h3 className=" text-5xl lg:text-6xl font-semibold">
            Elevate your tool&apos;s visibility!
          </h3>
          <p className="mt-3 text-lg lg:text-xl">
            Showcase your tool to a global audience on Geektools
          </p>
          <a href="/signup">
            <Button className=" mt-10  hover:bg-black hover:text-white  w-fit h-11 gap-2 lg:px-8 px-4  font-medium   shadow-[rgba(0,0,0,0.08)] hover:shadow-xl  transition-all text-primary bg-white  text-base lg:text-lg ">
              Submit a Tool
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}

export default CtaSection;
