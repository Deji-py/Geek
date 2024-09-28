"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiGrid2H } from "react-icons/ci";
import { IoIosMegaphone } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { RiHome6Line } from "react-icons/ri";
const tabs = [
  {
    value: "mytools",
    title: "My Tools",
    icon: (props) => <CiGrid2H {...props} />,
    route: "/dashboard/my-tools",
  },
  {
    value: "favorite",
    title: "Favorite tools",
    icon: (props) => <MdOutlineBookmarkBorder {...props} />,
    route: "/dashboard/favorite-tools",
  },
  {
    value: "advertise",
    title: "Advertise",
    icon: (props) => <IoIosMegaphone {...props} />,
    route: "/dashboard/advertise",
  },
  {
    value: "profile",
    title: "Edit Profile",
    icon: (props) => <FaRegUserCircle {...props} />,
    route: "/dashboard/edit-profile",
  },
];

function DashNavigator() {
  const pathname = usePathname();
  return (
    <div>
      {/* Desktop */}
      <div className="  hidden lg:flex glassmorphism  !rounded-full p-1.5 w-fit bg-secondary/50  border-glassBorder border-[0.5px]  items-center gap-2">
        <Link
          href={"/"}
          className="px-2 h-full p-1.5  hover:bg-glassBorder bg-transparent  border border-transparent  rounded-full"
        >
          <RiHome6Line size={20} />
        </Link>
        {tabs.map((item, index) => (
          <Link
            className={cn(
              pathname === item.route
                ? "hover:bg-primary/80 primary_btn bg-primary "
                : "hover:bg-white/5 bg-transparent",
              "px-5 p-2  relative  border border-transparent  rounded-full "
            )}
            href={item.route}
            key={index}
          >
            {item.title === "Advertise" && (
              <div className=" w-fit z-[10] right-0 rotate-12  -top-0.5 text-[0.6rem] absolute bg-orange-200 text-orange-600 leading-none py-0.5 px-2 rounded-full ">
                Pro
              </div>
            )}
            <div className=" group px-2 flex flex-row justify-center gap-2 items-center">
              {
                <item.icon
                  size={18}
                  className={" flex-none  -mt-1 rotate-0 ease-in-out animdurat"}
                />
              }
              <p className=" leading-none">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashNavigator;
