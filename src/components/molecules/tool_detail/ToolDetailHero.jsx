import { Button } from "@/components/ui/button";
import React from "react";
import ToolInUseCarousel from "./ToolInUseCarousel";
import { ArrowUpRightFromSquare, CopyIcon } from "lucide-react";
import { MdVerified } from "react-icons/md";
import AddToBookmarkBtn from "./AddToBookmarkBtn";

import no_image from "../../../../public/images/png/no_img.png";

async function ToolDetailHero({ data, toolId, user, type }) {
  return (
    <div className=" lg:h-fit my-8 px-3 lg:px-5 lg:mt-20 w-full  flex lg:flex-row flex-col gap-10 ">
      <div className=" lg:h-[7rem] rounded-full     w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0  right-0 bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <div className=" lg:h-[15rem] rounded-full   w-[6rem] h-[6rem] lg:w-[15rem] absolute left-0 top-0 lg:left-10 bg-[hsl(223,100%,80%)]   blur-[100px] lg:blur-[150px]"></div>

      <div className=" lg:w-[50%] w-full relative ">
        <div className="lg:flex-row flex-col w-full  flex items-start  gap-5">
          <div className="w-20 h-20 bg-gray-200 flex-none overflow-hidden rounded-xl">
            <img
              width={600}
              height={600}
              className="w-full h-full object-cover"
              src={
                type === "user" || type === "premium_user"
                  ? data?.user_tool.logo
                    ? !data?.user_tool.logo.includes(
                        process.env.NEXT_PUBLIC_API_BASE_URL
                      )
                      ? `${data?.user_tool.logo}`
                      : `${data?.user_tool.logo}`
                    : no_image
                  : data?.logo || no_image
              }
              alt="logo"
            />
          </div>
          <div className="w-full">
            <div className=" flex items-start w-full  lg:mt-5 relative justify-between">
              <div className=" w-full ">
                <h3 className=" text-xl relative w-[80%] flex-wrap lg:text-2xl flex items-start gap-2  font-semibold">
                  {type === "user" || type === "premium_user"
                    ? data?.user_tool?.name
                    : data?.name}

                  {/* <div className="bg-white rounded-full w-3  h-3 flex flex-col justify-center items-center  absolute top-0  -right-5">
                    <MdVerified className="w-[1.1rem] h-[1.1rem] flex-none  svg_glow   z-50 text-primary" />
                  </div> */}
                </h3>
                <div className=" lg:text-base mt-3 flex items-center gap-2 text-base">
                  Category:
                  <div
                    className={
                      "font-light text-base px-3 h-5 lg:h-6 flex justify-center items-center   cursor-pointer border-cyan-800 border-[0.5px] bg-cyan-600  rounded-full"
                    }
                  >
                    <div className="lg:mt-0.5">
                      {type === "user" || type === "premium_user"
                        ? data?.user_tool?.category?.name
                        : data?.category}
                    </div>
                  </div>
                </div>
              </div>

              <AddToBookmarkBtn type={type} toolId={toolId} user={user} />
            </div>
            <div className="mt-5 flex w items-start flex-col gap-2.5 text-lg">
              <p className="  text-base  text-wrap break-words w-full lg:mt-1">
                {type === "user" || type === "premium_user"
                  ? data?.user_tool?.intro
                  : data?.intro}
              </p>

              <div className="  lg:text-base text-base">
                Pricing Model:{" "}
                <span className="text-yellow-500 pl-2">
                  {type === "user" || type === "premium_user"
                    ? data?.user_tool?.pricing
                    : data?.pricing}
                </span>
              </div>
              <div className=" flex items-start  w-full  text-wrap break-words gap-x-3 text-base lg:text-base">
                Hashtags:
                <div className=" flex flex-wrap items-center gap-x-3 text-slate-400 ">
                  {type === "user" || type === "premium_user" ? (
                    <>
                      {data?.user_tool?.hashtag?.map((item, key) => (
                        <span className="underline" key={key}>
                          {item?.term}
                        </span>
                      ))}
                    </>
                  ) : (
                    <>
                      {data?.hashtag?.map((term, key) => (
                        <span className="underline" key={key}>
                          {term}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className=" flex  items-center mt-4">
                <a
                  target="_blank"
                  href={
                    type === "user" || type === "premium_user"
                      ? data?.user_tool?.url
                      : data?.url
                  }
                >
                  <Button className="font-normal  h-10 gap-2 lg:!px-5 px-4 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-base lg:text-lg">
                    Visit Website
                    <ArrowUpRightFromSquare className="w-4 h-4 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToolInUseCarousel
        images={
          type === "user" || type === "premium_user" ? data?.tool_info : data
        }
        type={type === "user" || type === "premium_user"}
      />
    </div>
  );
}

export default ToolDetailHero;
