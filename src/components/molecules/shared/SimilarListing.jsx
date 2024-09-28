"use client";
import React, { useEffect, useState } from "react";
import ToolCard from "./ToolCard";
import { getSearchCSVResult, getSearchResult } from "../search/SearchText";

function SimilarListing({ category, id }) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
    if (!category) {
      setResult(null);
    } else {
      (async () => {
        try {
          const searchResult = await getSearchResult(category);
          const csvSearchResult = await getSearchCSVResult(category);
          if (searchResult && csvSearchResult) {
            const combinedResult = [...searchResult, ...csvSearchResult];
            const filteredResult = combinedResult.filter(
              (item) => item?.id !== id
            );

            setResult(filteredResult);
          }
        } catch (err) {
          setResult(null);
        }
      })();
    }
  }, [category, id]);

  if (result) {
    return (
      <div className="px-3 lg:px-0 w-full">
        <h3 className="lg:text-2xl text-xl pl-2 lg:pl-0 relative w-fit flex items-center gap-2 py-3 font-semibold">
          Similar listings
        </h3>
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {result.slice(1, 9).map((item, key) => (
            <ToolCard
              item={item}
              key={key}
              type={item.created_by || "user"}
              toolId={item.id}
              pricing={item?.user_tool?.pricing || item?.pricing}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default SimilarListing;
