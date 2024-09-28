"use client";
import React from "react";
import Image from "next/image";
import visibility from "../../../../public/images/svg/visiblity.svg";
import opportunity from "../../../../public/images/svg/opportunity.svg";
import community from "../../../../public/images/svg/community.svg";
import { Github_Globe } from "./Github_Globe";

const features = [
  {
    title: "Visibility",
    desc: "Showcase your tool to a vast audience of tech-savvy individuals who are passionate about discovering the latest innovations.",
    image: visibility,
  },
  {
    title: "Community",
    desc: "Connect with like-minded developers, creators, and potential collaborators who share your passion for technology and innovation.",
    image: community,
  },
  {
    title: "Visibility",
    desc: "Gain exposure to potential users, investors, and collaborators who can help take your tool to the next level",
    image: opportunity,
  },
];

const FeatureCard = ({ item }) => {
  return (
    <div className=" relative  cursor-pointer group">
      <div className="h-[150px] lg:h-[150px] absolute  group-hover:rotate-2  rotate-0 transition-all rounded-lg  origin-top-left  duration-300 left-0 bg-gradient-to-r from-primary to-greeny p-3 top-0 w-full "></div>
      <div className=" flex  h-[150px] lg:h-[150px] p-3 relative z-[1000]  bg-secondary border-glassBorder border  rounded-lg gap-4">
        <div>
          <Image src={item.image} className="w-[60px] flex-none" alt="aiLogo" />
        </div>
        <div className=" flex-1 text-start">
          <h3 className=" font-semibold text-lg">{item.title}</h3>
          <p className=" text-gray-300 lg:text-base text-sm">{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className=" grid  grid-cols-1 lg:grid-cols-3   text-center mt-10  w-full max-w-6xl gap-5">
      {features.map((item, index) => (
        <FeatureCard key={index} item={item} />
      ))}
    </section>
  );
};

function WorldMap() {
  return (
    <div className=" pb-0 pt-20 lg:py-20 lg:px-0 px-3 w-full max-w-7xl">
      <div className=" flex flex-col justify-center w-full   items-center ">
        <p className=" lg:text-xl text-center max-w-4xl text-sm ">
          {` Geek.tools is the ultimate platform for sharing your creations with a
        global community of tech enthusiasts, developers, and entrepreneurs.
        Whether you've developed a game-changing AI tool, a revolutionary
        development software tool, or a software as a side project, we want to
        hear about it!`}
        </p>
      </div>
      <div className=" relative mt-16 flex flex-col justify-center items-center">
        <div className=" lg:h-[10rem] rounded-full     w-[8rem] h-[8rem] lg:w-[10rem] absolute   bg-[hsl(223,100%,57%)] blur-[100px] lg:blur-[150px]"></div>
        <Github_Globe />
      </div>
      <div className=" flex flex-col mb-16 mt-20 lg:my-20 justify-center items-center">
        <h3 className=" text-xl text-center lg:text-4xl">
          Why Submit Your Tool to Geek.tools?
        </h3>
        <Features />
      </div>
    </div>
  );
}

export default WorldMap;
