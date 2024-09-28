"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../../../public/images/png/logo.png";
import Image from "next/image";
import Navbar from "./Navbar";
import { LogIn, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import noProfile from "../../../../public/images/png/no-profile.png";
import navlist from "../../../json/navlist.json";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AnimatePresence, useAnimation } from "framer-motion";
import { Spiral as Hamburger } from "hamburger-react";
import { motion } from "framer-motion";
import { MdDashboard } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import ModalSearch from "./ModalSearch";
import { Ripple } from "primereact/ripple";

function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const controls = useAnimation();
  const [isAtTop, setIsAtTop] = useState(true);
  const [logoUrl, setLogoUrl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const isTop = scrollTop < 50;
      setIsAtTop(isTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setOpen(!open);
    controls.start(open ? "closed" : "open");
  };

  // const handleFetchProfile = async () => {
  //   if (typeof window !== "undefined") {
  //     const user = localStorage.getItem("currentUser");
  //     if (user) {
  //       setIsLoggedIn(true);
  //       const parsed = JSON.parse(user);
  //       try {
  //         const profile = await fetchProfile(parsed.user_id);
  //         if (profile) {
  //           profile?.profile_picture &&
  //             setLogoUrl(`${profile?.profile_picture}`);
  //         } else {
  //           setLogoUrl(null);
  //         }
  //       } catch (error) {
  //         setLogoUrl(null);
  //       }
  //     } else {
  //       setIsLoggedIn(false);
  //       setLogoUrl(null);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   handleFetchProfile();
  // }, [pathname]);

  return (
    <>
      <motion.section
        initial={{}}
        className={`sticky  flex flex-col justify-center  items-center top-0 z-[5000] ${
          isAtTop ? "bg-transparent" : "bg-secondary/50  backdrop-blur-sm"
        }`}
      >
        <div className="w-full h-14 lg:h-20  flex items-center  justify-between  px-3  max-w-7xl">
          <a href="/">
            <Image src={logo} className=" lg:w-32 w-28 " alt="logo" />
          </a>
          <Navbar />

          <div className="  flex lg:gap-5 gap-3  items-center">
            <div className="px-2 cursor-pointer h-full p-1.5 lg:mt-0 -mt-2 rounded">
              <SearchIcon onClick={() => setSearchModalOpen(true)} size={20} />
            </div>
            <ModalSearch
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />
            <div className="hidden lg:block">
              <div className="  relative">
                <div className="lg:w-9 peer cursor-pointer relative z-[1000] bg-gray-200 lg:h-9 w-7 h-7 !rounded-full   overflow-hidden">
                  <Image
                    className="w-full  object-cover h-full"
                    width={300}
                    height={300}
                    src={logoUrl || noProfile}
                    alt="User Avatar"
                  />
                </div>

                <div className="glassmorphism menucard  invisible opacity-0 hover:opacity-100 hover:translate-y-0 peer-hover:opacity-100 duration-300 -translate-y-10 peer-hover:translate-y-0 p-2 hover:visible flex  peer-hover:visible flex-col gap-3 right-0 mt-2 absolute w-[200px] border-glassBorder z-[-10]  text-white">
                  {!isLoggedIn ? (
                    <>
                      <Link href={"/login"}>
                        <div className=" group mt-4 cursor-pointer hover:bg-transparent ">
                          <Button className=" !rounded-full font-normal w-full text-md  hover:bg-glassBorder glassmorphism  border-glassBorder">
                            <LogIn className="w-4 h-4 mr-2 group-hover:rotate-12 rotate-0" />{" "}
                            Login
                          </Button>
                        </div>
                      </Link>
                      <Link href={"/signup"}>
                        <div className=" group cursor-pointer hover:bg-transparent ">
                          <Button className=" font-normal w-full text-md primary_btn  border border-primary">
                            Create Account
                          </Button>
                        </div>
                      </Link>
                    </>
                  ) : (
                    <>
                      <div className=" group cursor-pointer hover:bg-transparent ">
                        <a href="/dashboard/my-tools" className="w-full">
                          <Button className=" font-normal w-full text-md primary_btn  border border-primary">
                            <MdDashboard
                              className="w-4 h-4 mr-2 rotate-0"
                              size={20}
                            />
                            Go to Dashboard
                          </Button>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <a href="/submit-tool">
              <Button className="bg-primary   hover:shadow-none  hover:bg-gradient-to-r hover:from-blue-500 hover:to-teal-500  duration-300   px-4 py-0.5 hidden text-base  rounded-full lg:flex flex-col justify-center items-center  ">
                <p className="relative z-20 mt-0.5"> Submit a Tool</p>
                <Ripple />
              </Button>
            </a>
            <div className=" block lg:hidden  -mt-2">
              <Hamburger
                toggled={open}
                size={20}
                distance="lg"
                toggle={setOpen}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* for mobile */}
      {open && (
        <div className="fixed top-0 left-0 w-full flex flex-col       justify-center h-screen z-[50000]">
          <div
            onClick={toggleMenu}
            className="  bg-black/50 w-full   h-full"
          ></div>
          <div className="top-0 left-0 mt-14   absolute  p-3   w-full">
            <AnimatePresence>
              <motion.div
                initial={{
                  y: -50,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                className=" glassmorphism  backdrop-blur-xl p-5  rounded-[20px]  h-fit  w-full"
              >
                <div className="w-full">
                  <nav className="  flex flex-col items-start gap-5">
                    {navlist.map((item, index) => (
                      <a
                        className={cn(
                          pathname === item.route
                            ? "text-white"
                            : "text-gray-200",
                          "lg:text-center text-base flex flex-col w-full relative lg:justify-center font-normal  hover:text-white  hover: transition-all ease-in-out animdurat lg:items-center"
                        )}
                        key={index}
                        href={item.route}
                      >
                        <div className="relative w-fit">
                          {item.title === "Submit A tool" && (
                            <div className="absolute -top-3 -right-3 rotate-12 ">
                              <div className="text-black h-4 flex items-center justify-center  relative z-[1000] bg-gradient-to-r from-primary to-greeny px-2 rounded-full text-[10px] font-medium">
                                <p> Free</p>
                              </div>
                              <div className="text-black bg-gradient-to-r blur-md from-primary w-8 absolute top-0 h-3 to-greeny px-2 rounded-full text-[10px] font-medium"></div>
                            </div>
                          )}
                          {item.title}
                        </div>
                        {pathname === item.route && (
                          <div className="w-5 h-1 bg-white rounded-full" />
                        )}
                      </a>
                    ))}
                  </nav>
                  <div className=" flex flex-col  gap-3 items-center">
                    {!isLoggedIn ? (
                      <>
                        <div className=" flex flex-row justify-center  gap-2 w-full items-center">
                          <a href="/login" className=" flex-1">
                            <Button className=" font-normal mt-5 flex w-full text-md  border border-primary">
                              Login
                            </Button>
                          </a>
                          <a href="/signup" className=" flex-1">
                            <Button className=" bg-white bg-[#161F27]/50 font-normal mt-5 flex w-full text-md   border border-glassBorder">
                              Signup
                            </Button>
                          </a>
                        </div>
                      </>
                    ) : (
                      <div className="mt-8 w-full">
                        <div className=" flex w-full items-center justify-start gap-4">
                          <div className="w-10 h-10 !rounded-lg bg-secondary/50  overflow-hidden">
                            <Image
                              className="w-full object-cover h-full"
                              width={300}
                              height={300}
                              src={logoUrl || noProfile}
                              alt="User Avatar"
                            />
                          </div>
                          <div className="flex-1">
                            <a href="/dashboard/my-tools" className=" flex-1">
                              <Button className=" font-normal flex w-full text-md  border border-primary">
                                <MdDashboard
                                  className="w-4 h-4 mr-2 rotate-0"
                                  size={20}
                                />{" "}
                                Go to Dashboard
                              </Button>
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <a href="/submit-tool">
                  <Button className="   mt-4  px-0 p-0.5  rounded-full lg:hidden w-full flex flex-col justify-center items-center h-11 ">
                    <div className="font-normal ripple  p-3 h-6  bg-primary text-md w-full  text-base leading-none rounded-full flex flex-col justify-center items-center">
                      <p className="relative z-20"> Submit a Tool</p>
                    </div>
                  </Button>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
