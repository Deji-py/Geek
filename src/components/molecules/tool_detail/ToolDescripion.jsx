"use client";
import React from "react";
import tools from "../../../../public/images/png/tools.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import embeds from "../../../../public/images/svg/embeds.svg";
import { CopyIcon } from "lucide-react";
import { SocialIcon } from "react-social-icons";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";

const embedsCode = `iframe here`;

function ToolDescription({ data, type }) {
  console.log(data);

  return (
    <div className="lg:flex-row flex-col py-10 lg:py-14 px-3 lg:px-0 flex gap-8">
      <div className="w-full bg-secondary p-4 rounded-[10px] h-fit border border-glassBorder">
        {type === "user" || type === "premium_user" ? (
          <>
            <div className="w-full flex items-center justify-between">
              <h3 className="lg:text-xl text-lg font-semibold">Description</h3>
              {/* Social icons */}
              <div className="flex gap-3">
                {data?.tool_info?.links.map((link, index) => (
                  <SocialIcon
                    key={index}
                    url={link.link}
                    style={{ height: 25, width: 25 }}
                  />
                ))}
              </div>
            </div>
            <div className="lg:text-base text-sm mt-10">
              {data?.tool_info?.description}
            </div>
            <div>
              <div className="mt-5">
                <h3>Who is this tool for?</h3>
                <div className="flex flex-row flex-wrap mt-2 gap-3">
                  {data?.tool_info?.agent.map((item, index) => (
                    <Badge
                      className={
                        "right-1 h-8 gap-2 text-sm lg:text-md font-normal rounded-none px-2 bg-[#22262B] hover:bg-[#22262B]"
                      }
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-5">
                <h3>Core Features</h3>
                <div className="flex flex-col flex-wrap mt-2 gap-3">
                  {data?.tool_info?.features.map((item, index) => (
                    <Badge
                      className={
                        "right-1 h-8 gap-2 text-sm lg:text-md font-normal rounded-none px-2 bg-[#22262B] hover:bg-[#22262B]"
                      }
                      key={index}
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4"></div>
            {data?.tool_info?.video && (
              <ReactPlayer width="100%" url={data?.tool_info?.video} controls />
            )}
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center h-[400px]">
              <h3 className="text-xl lg:text-2xl">
                This Tool has not been claimed
              </h3>
              <p className="text-gray-500 mt-2">
                Are you the owner of this tool?
              </p>
              <a href="/dashboard/my-tools">
                <Button className="font-normal w-fit mt-6 right-1 h-10 gap-2 lg:px-8 px-4 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-base lg:text-lg">
                  Update this Tool
                </Button>
              </a>
            </div>
          </>
        )}
      </div>

      <div className="lg:w-[40%] w-full">
        <div className="w-full flex justify-center items-center">
          <section className="w-full relative max-w-6xl h-[260px] lg:h-[270px] rounded-xl overflow-hidden bg-[#0A50FF] flex flex-col justify-center items-center to-greeny">
            <Image
              src={tools}
              className="w-40 -right-3 absolute bottom-0"
              alt="tools"
            />
            <div className="w-full h-full bg-gradient-to-b from-transparent via-transparent absolute top-0 left-0 to-[#0A50FF]"></div>
            <div className="items-center px-5 lg:px-0 relative text-center w-full flex-col justify-center flex">
              <h3 className="text-4xl font-semibold">
                Elevate your tool&apos;s visibility!
              </h3>
              <p className="mt-3 text-sm px-8 lg:text-base">
                Showcase your tool to a global audience on Geektools
              </p>
              <a href="/submit-tool">
                <Button className="mt-10 hover:bg-black hover:text-white w-fit h-11 gap-2 lg:px-8 px-4 font-medium shadow-[rgba(0,0,0,0.08)] hover:shadow-xl transition-all text-primary bg-white text-base lg:text-lg">
                  Submit a Tool
                </Button>
              </a>
            </div>
          </section>
        </div>
        <div className="py-4 mt-5">
          <h3 className="font-semibold text-lg">Launch Embeds</h3>
          <p className="text-sm mt-1 text-slate-400">
            {`Use website badges to drive support from your community for your Toolify Launch. They're easy to embed on your homepage or footer.`}
          </p>
          <Image src={embeds} className="mt-3 w-full" alt="embeds" />
          <div className="flex mt-3 justify-between items-center">
            <div
              onClick={() => {
                navigator.clipboard.writeText(embedsCode);
                toast("Copied to clipboard", { type: "info" });
              }}
              className="p-2 px-4 hover:bg-primary lg:text-base text-sm flex items-center w-fit gap-3 rounded-full text-white bg-secondary border border-glassBorder"
            >
              <CopyIcon /> Copy embed code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ToolDescription;
