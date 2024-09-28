import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { CiGrid2H } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosMegaphone } from "react-icons/io";
import { MdOutlineBookmarkBorder } from "react-icons/md";

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
function BotomNavMobile() {
  const pathname = usePathname();
  return (
    <div className="  lg:hidden flex w-full z-[10]   justify-evenly fixed bottom-0   rounded p-1.5 left-0 bg-secondary  border-glassBorder border-[0.5px]  items-center gap-2">
      {tabs.map((item, index) => (
        <Link
          className={cn(
            pathname === item.route
              ? "hover:bg-primary/10  text-primary "
              : "hover:bg-glassBorder  bg-transparent",
            "px-5 p-1  relative  border border-transparent  rounded "
          )}
          href={item.route}
          key={index}
        >
          <div className=" group flex flex-col justify-center px-2 gap-2 items-center">
            {
              <item.icon
                size={18}
                className={
                  "group-hover:rotate-12 flex-none  -mt-1 rotate-0 ease-in-out animdurat"
                }
              />
            }
            {item.title === "Advertise" && (
              <div className=" w-fit z-[10] right-0 rotate-12  bottom-4 text-[0.5rem] absolute bg-orange-200 text-orange-600 leading-none py-0.5 px-2 rounded-full ">
                Pro
              </div>
            )}
            <p className="text-xs">{item.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BotomNavMobile;
