import React from "react";
import best from "../../../../public/images/png/best.png";
import Image from "next/image";
import test_tool from "../../../../public/images/png/test_tool.png";

const BestToolDetailHero = () => {
  return (
    <div>
      <section className=" w-full justify-center px-3 py-5 items-center ">
        <div className=" lg:h-[7rem] rounded-full   w-[6rem] h-[6rem] lg:w-[7rem] absolute right-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>

        <div className=" lg:h-[7rem] rounded-full   w-[6rem] h-[6rem] lg:w-[7rem] absolute top-0 left-20  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
        <div className=" lg:h-[7rem] rounded-full   w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
        <div className="glassmorphism border-glassBorder rounded-[20px]  max-w-7xl p-3 lg:p-6 w-full ">
          <div className=" w-full  lg:flex-row flex-col flex items-center  relative  ">
            <div className=" py-5">
              <h1 className="  text-[2.4rem] leading-[2.3rem] lg:text-7xl font-semibold ">
                Some handpicked{" "}
                <span className="gradient_text">
                  <br />
                  Best tools{" "}
                </span>
              </h1>
              <p className=" mt-4 px-2 lg:px-0 text-[#c1cae0]  text-sm lg:text-base font-light max-w-3xl w-full ">
                {`Whether you're seeking the top developer tools, design tools, AI tools, or marketing tools for boosting brand awareness, look no further. GoodFirms has meticulously curated a selection of expert service providers in these domains. Through extensive research, we've identified the cream of the crop, ensuring these companies excel in delivering professional-grade solutions. From startups to seasoned firms, our list encompasses a range of providers adept at implementing effective strategies and tactics to elevate your projects. Whether it's optimizing workflows, enhancing user experience, leveraging artificial intelligence, or amplifying your marketing efforts, these providers are poised to deliver impactful results."`}
              </p>
            </div>
            <div className=" lg:w-[60%] flex items-center justify-center">
              <Image src={best} className=" w-full lg:w-[70%]" />
            </div>
          </div>
          <div
            className="
   grid grid-cols-2 lg:grid-cols-6 items-center mt-4  gap-5"
          >
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div
                key={index}
                className=" bg-secondary/50 border border-glassBorder py-1 rounded-2xl p-4"
              >
                <Image src={test_tool} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BestToolDetailHero;
