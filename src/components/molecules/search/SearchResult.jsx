"use client";
import React, { useState, useEffect } from "react";
import ToolCard from "../shared/ToolCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import SearchFilter from "./SearchFilter";
import AdSpace from "../shared/AdSpace";
import LoadingGridSkeletons from "../shared/LoadingGridSkeletons";
import { Sidebar } from "primereact/sidebar";
import { Paginator } from "primereact/paginator";
import SearchResultNotFound from "../shared/SearchResultNotFound";

function SearchResult({ result }) {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    setFilteredItems(result);
    setDisplayedItems(result?.slice(0, rows));
  }, []);

  const onPageChange = (event) => {
    const startIndex = event.first;
    const endIndex = event.first + event.rows;
    setDisplayedItems(filteredItems?.slice(startIndex, endIndex));
    setFirst(event.first);
    setRows(event.rows);
    if (typeof window !== "undefined") {
      const middlePosition = document.documentElement.scrollHeight / 8;
      window.scrollTo({ top: middlePosition, left: 0 });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const middlePosition = document.documentElement.scrollHeight / 7;
      window.scrollTo({ top: middlePosition, left: 0, behavior: "smooth" });
    }
  }, [result]);

  return (
    <section className="lg:flex-row flex-col px-3 lg:px-0 lg:gap-5 flex w-full gap-3 max-w-7xl my-5 items-start">
      {!result ? (
        <LoadingGridSkeletons count={8} columns={"lg:grid-cols-4"} />
      ) : (
        <div className="w-full">
          {result.length === 0 ? (
            <div className="w-full  max-w-7xl flex flex-col justify-center items-center text-center text-xl mt-20 lg:text-2xl">
              <SearchResultNotFound />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row  items-start gap-5 ">
              <div className="w-full lg:max-w-[350px] flex-col justify-end flex items-center">
                <AdSpace />
                <div className="z-[3000] hidden lg:block rounded-xl bg-secondary w-full p-1 overflow-y-scroll hideScroll h-fit border border-glassBorder">
                  <div className="h-fit flex-none p-3 rounded-md">
                    <h3 className="text-xl mb-3">Filter Search</h3>
                    <SearchFilter
                      setFilteredItems={setFilteredItems}
                      setFirst={setFirst}
                      itemsPerPage={rows}
                      setDisplayedItems={setDisplayedItems}
                      result={result}
                    />
                  </div>
                </div>

                {result && (
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="font-normal lg:hidden right-1 h-10 gap-4 hover:bg-primary border-[0.5px] border-glassBorder bg-secondary text-base lg:text-lg"
                  >
                    <Filter size={20} /> Filter
                  </Button>
                )}
                <Sidebar
                  fullScreen
                  position="bottom"
                  baseZIndex={10000}
                  className=" bg-secondary !text-white "
                  onHide={() => setDialogOpen(false)}
                  visible={dialogOpen}
                >
                  <div className=" rounded-xl bg-secondary w-full  overflow-y-scroll hideScroll h-full pb-20 ">
                    <div className="h-fit flex-none p-3 rounded-md">
                      <h3 className="text-xl mb-8">Filter Search</h3>
                      <SearchFilter
                        setFilteredItems={setFilteredItems}
                        setFirst={setFirst}
                        itemsPerPage={rows}
                        setDialogOpen={setDialogOpen}
                        setDisplayedItems={setDisplayedItems}
                        result={result}
                      />
                    </div>
                  </div>
                </Sidebar>
              </div>
              <div className="flex-1 w-full">
                <div className="grid w-full gap-5 lg:grid-cols-3 flex-1">
                  {displayedItems?.map((item, key) => (
                    <ToolCard
                      item={item}
                      key={key}
                      type={item.created_by || "user"}
                      toolId={item.id}
                      pricing={
                        item?.created_by === "user" ||
                        item?.created_by === "premium_user"
                          ? item?.user_tool?.pricing
                          : item?.pricing
                      }
                    />
                  ))}
                </div>
                {result && (
                  <Paginator
                    first={first}
                    rows={rows}
                    totalRecords={filteredItems?.length}
                    onPageChange={onPageChange}
                    template="PrevPageLink PageLinks NextPageLink"
                    className="mt-8 bg-transparent"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default SearchResult;
