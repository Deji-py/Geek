"use client";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React from "react";

function SearchResultNotFound() {
  const params = useSearchParams();
  return (
    <div className=" p-8 pt-0 rounded-lg shadow-lg max-w-md text-center">
      <svg
        className="w-16 h-16 mx-auto mb-4 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m2 0a2 2 0 100-4H7a2 2 0 100 4m4 0v4m-4 0a2 2 0 11-4 0m12 0a2 2 0 11-4 0"
        />
      </svg>
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">
        No Results Found for {params.get("query")}
      </h2>
      <p className="text-gray-600 text-base mb-6">
        We couldn&apos;t find any results for your search. Please try again with
        different keywords.
      </p>
      <Button
        onClick={() => {
          if (typeof window !== "undefined") {
            window.scrollTo(0, 0);
          }
        }}
        className="font-normal  right-1 h-10 gap-4 hover:bg-primary border-[0.5px] border-glassBorder bg-secondary text-base lg:text-lg"
      >
        Try another Search
      </Button>
    </div>
  );
}

export default SearchResultNotFound;
