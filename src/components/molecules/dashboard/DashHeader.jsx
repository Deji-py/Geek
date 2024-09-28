"use client";

import React, { useEffect, useState } from "react";
import DashNavigator from "./dashboard_tabs/DashNavigator";
import logo from "../../../../public/images/png/logo.png";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { RiHome6Line } from "react-icons/ri";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/user/userSlice";
import noProfile from "../../../../public/images/png/no-profile.png";
import clearCookie from "@/utils/clearCookie";
import { MdContactSupport } from "react-icons/md";

function DashHeader() {
  const dispatch = useDispatch();
  // const currentUser = useSelector((state) => state.user.currentUser);
  const [isAtTop, setIsAtTop] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("currentUser");

      if (data) {
        setCurrentUser(JSON.parse(data));
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
      dispatch(logout());
      clearCookie();
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop < 50;
      setIsAtTop(isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className={`flex lg:pt-8 p-3 lg:py-5 sticky top-0 z-[100]  items-center w-full justify-center 
    ${isAtTop ? "bg-transparent" : "bg-secondary/50  backdrop-blur-sm"}`}
    >
      <div className="lg:h-[10rem] rounded-full bg-gradient-to-r -mt-40 w-[6rem] h-[6rem] lg:w-[10rem] absolute from-primary to-[#0AD9BE] blur-3xl lg:blur-[110px]"></div>
      <div className="w-full max-w-7xl relative z-[1000] flex flex-row justify-between items-center">
        <div>
          <Image src={logo} className="lg:w-32 w-28" alt="Logo" />
        </div>

        <DashNavigator />

        <div className="flex flex-row items-center lg:gap-3 gap-5">
          <div className="text-end flex-col lg:flex items-end hidden ">
            <div>
              {currentUser?.full_name ? (
                "Hi, " + currentUser?.full_name?.split(" ")[0]
              ) : (
                <p className="w-20 h-4 mb-2.5  glassmorphism animate-pulse "></p>
              )}
            </div>
            <div className="text-sm text-gray-400">
              {currentUser?.email ? (
                <>{currentUser?.email}</>
              ) : (
                <p className="w-40 h-4  glassmorphism animate-pulse "></p>
              )}
            </div>
            <div className=" mt-1">
              {currentUser && (
                <>
                  {currentUser?.is_premium ? (
                    <div className=" text-xs bg-orange-200 text-orange-600 leading-none py-0.5 px-2 rounded-full ">
                      Premium
                    </div>
                  ) : (
                    <div className=" text-xs bg-green-200 text-green-600 leading-none py-0.5 px-2 rounded-full ">
                      Free Plan
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <Link
            href="/"
            className="group lg:hidden flex flex-col bg-[rgba(100,100,100,0.2)] p-2 rounded-md justify-center gap-2 items-center"
          >
            <RiHome6Line size={20} />
          </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10  !rounded-full   bg-gray-200    overflow-hidden">
                  <Image
                    className="w-full  object-cover h-full"
                    width={300}
                    height={300}
                    src={
                      currentUser?.profilepic
                        ? `${currentUser?.profilepic}`
                        : noProfile
                    }
                    alt="User Avatar"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                sideOffset={15}
                align="end"
                className="bg-secondary w-[200px] border-glassBorder text-white"
              >
                <DropdownMenuLabel>
                  My Account
                  {currentUser && (
                    <>
                      {currentUser && currentUser?.is_premium ? (
                        <div className=" w-fit text-xs bg-orange-200 text-orange-600 leading-none py-0.5 px-2 rounded-full ">
                          Premium
                        </div>
                      ) : (
                        <div className=" w-fit text-xs bg-green-200 text-green-600 leading-none py-0.5 px-2 rounded-full ">
                          Free Plan
                        </div>
                      )}
                    </>
                  )}
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="bg-secondary/50" />
                <a href="/login">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="group cursor-pointer hover:!bg-glassBorder hover:!text-white"
                  >
                    <MdContactSupport className="w-4 h-4 mr-2 group-hover:rotate-12 rotate-0" />
                    Support
                  </DropdownMenuItem>
                </a>
                <a href="/login">
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="group cursor-pointer hover:!bg-glassBorder hover:!text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2 group-hover:rotate-12 rotate-0" />
                    Logout
                  </DropdownMenuItem>
                </a>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashHeader;
