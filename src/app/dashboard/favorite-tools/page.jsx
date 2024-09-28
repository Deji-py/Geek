"use client";
import ToolCard from "@/components/molecules/shared/ToolCard";
import { Button } from "@/components/ui/button";

import { ReloadIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import bookmark from "../../../../public/images/png/bookmark.png";
import Image from "next/image";

function Favourite() {
  const [favs, setFavs] = useState([]);
  const [isError, setIsError] = useState(false);
  const [bookmarks, setBookmarks] = useState();
  const [loading, setLoading] = useState(true);
  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/geeks_tools/create-bookmark/");
      if (Array.isArray(response.data)) {
        const combinedData = response.data.reduce((acc, item) => {
          if (item.combined_tool) {
            acc.push({ tool: item.combined_tool, bookmarkId: item.id });
          }
          if (item.csv_tool) {
            acc.push({ tool: item.csv_tool, bookmarkId: item.id });
          }
          return acc;
        }, []);
        setFavs(combinedData);
        setBookmarks(response.data);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      if (error.message.includes("Network Error")) {
        toast("Check your internet connection", {
          type: "error",
        });
      } else {
        toast("Something went wrong", {
          type: "error",
        });
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  if (loading) {
    return (
      <div className=" w-full h-[80vh] lg:h-screen  flex flex-col justify-center items-center">
        <div className=" loader !w-10" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className=" w-full h-[80vh] lg:h-screen text-center flex flex-col justify-center items-center">
        <h2 className=" text-xl font-semibold mb-2">Something went wrong</h2>
        <h3 className=" text-gray-400">Could not load profile</h3>
        <Button
          className={
            " bg-secondary border-glassBorder mt-4 border-[0.5px] text-md hover:bg-glassBorder  font-normal lg:text-lg"
          }
          onClick={fetchBookmarks}
        >
          Retry
          <ReloadIcon className=" ml-2 " />
        </Button>
      </div>
    );
  }
  if (isError) {
    return (
      <div className=" w-full h-[80vh] lg:h-[75vh] text-center flex flex-col justify-center items-center">
        <h2 className=" text-xl font-semibold mb-2">Something went wrong</h2>
        <h3 className=" text-gray-400">Could not load bookmarks</h3>
        <Button
          className={
            " bg-secondary border-glassBorder mt-4 border-[0.5px] text-md hover:bg-glassBorder  font-normal lg:text-lg"
          }
          onClick={fetchBookmarks}
        >
          Retry
          <ReloadIcon className=" ml-2 " />
        </Button>
      </div>
    );
  }

  return (
    <section className=" flex flex-col w-full lg:pb-0 pb-40  py-10    justify-center items-center">
      <div className="  w-full max-w-7xl">
        {favs.length === 0 ? (
          <div className=" w-full  lg:h-[70vh] h-[58vh] flex flex-col justify-center items-center">
            <div className=" flex flex-col justify-center items-center text-center gap-1">
              <Image src={bookmark} className=" w-20" alt="bookmark" />
              <h2 className=" mt-3 text-lg lg:text-xl">No Bookmarks yet</h2>
              <p className="text-gray-400 ">To add tools to your bookmarks</p>
              <a
                className=" flex items-center mt-2  text-center text-gray-400 hover:text-white group gap-1"
                href="/"
              >
                Go to home page
                <ArrowRight
                  className=" group-hover:translate-x-1 duration-300 translate-x-0"
                  size={16}
                />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 w-full px-3 gap-4 ">
            {favs.map((item, index) => (
              <ToolCard
                callback={fetchBookmarks}
                key={index}
                pricing={item?.tool?.user_tool?.pricing}
                toolId={item?.tool?.id}
                bookmarkId={item?.bookmarkId}
                type={item?.tool?.created_by}
                item={item?.tool}
                isFavourite={true}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Favourite;
