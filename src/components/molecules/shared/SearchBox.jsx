"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const fetchSuggestion = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/suggestion/`
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

function SearchBox() {
  const [suggestions, setSuggestions] = useState(null);

  const getData = async () => {
    try {
      const data = await fetchSuggestion();
      setSuggestions(data);
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const searchParam = useSearchParams();
  const [searchString, setSearchString] = useState(
    searchParam.get("query") || ""
  );
  const { push, replace } = useRouter();
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);

  const handleSearch = () => {
    const trimmedSearchString = searchString.trim();
    if (trimmedSearchString !== "") {
      const params = new URLSearchParams();
      params.set("query", trimmedSearchString);
      const newSearchString = params.toString();
      if (pathname === "/search") {
        replace(`${pathname}?${newSearchString}`);
      } else {
        push(`/search?${newSearchString}`);
      }
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "relative h-12 border rounded-full border-glassBorder bg-[hsl(212,28%,8%)] pl-1 flex items-center",
          typing ? "border-primary" : "border-glassBorder"
        )}
      >
        <SearchIcon className="w-4 h-4 ml-2 flex-none text-[#B1C1D2]" />
        <Input
          onChange={(e) => setSearchString(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          onBlur={() => setTyping(false)}
          onFocus={() => setTyping(true)}
          className="flex-1 h-8 focus-visible:ring-0 font-normal lg:text-lg border-none focus:ring-0 outline-none placeholder:text-[#51606f] focus:outline-none focus:border-none focus:bg-transparent"
          type={"text"}
          value={searchString}
          placeholder={"Enter a tool name or use case..."}
        />
        <Button
          onClick={handleSearch}
          className="font-normal z-[1000] relative  right-1 h-10 gap-2 lg:px-8 px-4 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-base lg:text-lg"
        >
          <div className="w-[65%] h-[70%] animate-ping z-[10]  rounded-full   bg-primary absolute"></div>
          <p className=" relative z-[60]"> Search</p>
        </Button>
      </div>
      <div className=" flex flex-wrap  justify-center items-center gap-3 mt-5">
        {suggestions &&
          suggestions?.map((item, key) => (
            <a
              className={
                "font-light text-xs lg:text-sm w-fit px-3 h-5 lg:h-6 flex justify-center items-center cursor-pointer border-[0.5px] border-[#253241] text-[#EBF0FF] bg-glassBorder hover:bg-[#253241]  rounded-full"
              }
              key={key}
              href={`/search?query=${item.text}`}
            >
              <div className="lg:mt-0.5">{item.text}</div>
            </a>
          ))}
      </div>
    </div>
  );
}

export default SearchBox;
