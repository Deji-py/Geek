"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRightFromSquare, BookmarkIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { MdVerified } from "react-icons/md";
import ailogo from "../../../../public/images/svg/ailogo.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

function BestToolCard({ isFeatured, pricing }) {
  const router = useRouter();

  return (
    <div className=" flex flex-col justify-center group items-center w-full  relative">
      <div
        className={cn(
          isFeatured
            ? "bg-[#141B29] border border-[hsl(223,38%,30%)]"
            : "bg-secondary border border-glassBorder",
          "   cursor-pointer relative lg:flex-row flex-col flex items-start gap-5   transition-all  duration-300 rounded-2xl p-3 w-full h-fit lg:h-[310px]"
        )}
      >
        <div className="bg-[#4a4f59] w-full h-[250px] lg:w-[35%] overflow-hidden lg:h-full rounded-[15px]">
          <img
            alt="tool in use"
            src={
              "https://img.freepik.com/free-vector/gradient-ui-ux-lahttps://img.freepik.com/free-vector/fashion-shopping-app-interface_23-2148655412.jpg?t=st=1715026002~exp=1715029602~hmac=3237c996f274bb0d2fea645b56f24b07f53fde207efc940e7b9226c90a852311&w=740"
            }
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 w-full">
          <div className="w-full" onClick={() => router.push("/tool/1")}>
            <div className=" w-full  flex items-start justify-between">
              <div className="w-full  flex items-start gap-5">
                <div className=" w-16 h-16  lg:w-24 lg:h-24 flex-none   overflow-hidden  rounded-lg bg-[#4a4f59]">
                  <img
                    alt="tool"
                    src={
                      "https://cdn2.iconfinder.com/data/icons/2018-social-media-app-logos/1000/2018_social_media_popular_app_logo_skype-512.png"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className=" flex items-start justify-between w-full ">
                  <div>
                    <div className=" flex-col flex gap-2 items-start">
                      <h4 className="lg:text-xl text-lg flex items-center font-semibold gap-1">
                        All in one SEO App{" "}
                        <MdVerified className="w-4 h-4  svg_glow text-primary  " />
                      </h4>
                      <div>
                        <Badge
                          className={
                            "font-light cursor-pointer px-6 glassmorphism  text-sm text-[#cddbff] bg-[hsl(223,38%,20%)]   rounded-full"
                          }
                        >
                          Productivity
                        </Badge>
                      </div>
                      <div
                        className={cn(
                          pricing === "Paid" && "text-[#0AD9BE]",
                          pricing === "Freemium" && "text-yellow-400",
                          "text-lg lg:text-xl sm:flex hidden font-medium  gap-5   items-center justify-between"
                        )}
                      >
                        <p>{pricing || "Paid"}</p>

                        <div className=" flex items-center text-sm lg:text-lg  text-gray-500 gap-3 ">
                          <a href="#" className="underline hover:text-primary">
                            #productivity
                          </a>
                          <a href="#" className="underline hover:text-primary">
                            #video
                          </a>
                          <a href="#" className="underline hover:text-primary">
                            #caliing
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="  hidden lg:flex  items-center gap-5">
                    <div className="flex items-center gap-3">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Image
                              src={ailogo}
                              className="w-6 h-6"
                              alt="logo"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ai Tool</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <BookmarkIcon
                              className=" hover:text-primary hover:fill-primary"
                              size={22}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Bookmark</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Button className="primary_btn border-transparent border text-[15px] lg:h-10  h-10 font-normal ">
                      Visit Website
                      <ArrowUpRightFromSquare className="w-4 h-4 ml-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-sm py-3 font-light w-full ">
              <div
                className={cn(
                  pricing === "Paid" && "text-[#0AD9BE]",
                  pricing === "Freemium" && "text-yellow-400",
                  "text-lg lg:text-xl flex sm:hidden font-medium  gap-5   items-center justify-start"
                )}
              >
                <p>{pricing || "Paid"}</p>

                <div className=" flex items-center text-sm lg:text-lg  text-gray-500 gap-3 ">
                  <a href="#" className="underline hover:text-primary">
                    #productivity
                  </a>
                  <a href="#" className="underline hover:text-primary">
                    #video
                  </a>
                  <a href="#" className="underline hover:text-primary">
                    #caliing
                  </a>
                </div>
              </div>
              <p className=" mt-3 lg:mt-0">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui sit
                facere et maiores provident, praesentium eaque? Asperiores
                laboriosam eligendi minus ipsum maiores similique, facilis
                distinctio, nulla nemo cupiditate, nihil fugit, Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Veritatis dicta,
                aperiam doloribus repudiandae, ab, quo dolorum quidem voluptas
                deleniti fugit aliquam illo delectus saepe blanditiis quod optio
              </p>
              <div className=" grid lg:grid-cols-3 grid-cols-1 mt-4 gap-3">
                {[1, 2, 3, 4, 5, 6].map((_, index) => (
                  <Badge
                    className={
                      "right-1 h-8 gap-2 text-xs lg:text-md font-normal   rounded-none px-2 bg-[#22262B]  hover:bg-[#22262B]"
                    }
                    key={index}
                  >
                    Lorem ipsum dolor amet {index}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className=" flex  sm:hidden items-center mt-3 justify-between w-full">
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Image src={ailogo} className="w-6 h-6" alt="logo" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ai Tool</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <BookmarkIcon
                      className=" hover:text-primary hover:fill-primary"
                      size={22}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bookmark</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button className="primary_btn  text-[15px] lg:h-8  h-10 font-normal ">
              Visit Website
              <ArrowUpRightFromSquare className="w-4 h-4 ml-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestToolCard;
