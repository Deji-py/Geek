"use client";
import React, { useEffect, useState } from "react";
import ToolCard from "../shared/ToolCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import CategoriesSection from "../homepage/CategoriesSection";
import SearchFilter from "../search/SearchFilter";
import AdSpace from "../shared/AdSpace";
import LoadingGridSkeletons from "../shared/LoadingGridSkeletons";
import { Paginator } from "primereact/paginator";
import { Sidebar } from "primereact/sidebar";
import axios from "axios";

function ExploreResult() {
  const [displayedItems, setDisplayedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(12);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [latest, setLatest] = useState(null);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/geeks_tools/all-tools/`
      );

      let csvTools = Array.isArray(response?.data?.csvtools)
        ? [...response?.data?.csvtools]
        : [];
      let combinedTools = Array.isArray(response?.data?.combined_tools)
        ? [...response?.data?.combined_tools]
        : [];

      // Sort the csvTools to have items with logo starting with "https://ucarecdn.com" come last
      const sortedCSVTools = csvTools.filter((items) => {
        return !items.logo.startsWith("https://ucarecdn.com");
      });
      const otherCSVTools = csvTools.filter((items) => {
        return items.logo.startsWith("https://ucarecdn.com");
      });

      const latest = [...combinedTools, ...sortedCSVTools, ...otherCSVTools];
      setLatest(latest);
      setFilteredItems(latest);
      setDisplayedItems(latest?.slice(0, rows));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onPageChange = (event) => {
    setLoading(true);
    setTimeout(() => {
      if (typeof window !== "undefined") {
        const middlePosition = document.documentElement.scrollHeight / 8;
        window.scrollTo({ top: middlePosition, left: 0 });
      }
      const startIndex = event.first;
      const endIndex = event.first + event.rows;
      setDisplayedItems(filteredItems.slice(startIndex, endIndex));
      setFirst(event.first);
      setRows(event.rows);

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="lg:flex-row flex-col px-3 lg:px-0 lg:gap-5 flex w-full gap-3 max-w-7xl my-5 items-start">
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
                result={latest}
              />
            </div>
          </div>
          {latest && (
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
            className=" bg-secondary"
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
                  result={latest}
                />
              </div>
            </div>
          </Sidebar>
        </div>
        <div className="flex-1 w-full">
          {!latest || loading ? (
            <LoadingGridSkeletons count={!latest ? 6 : 12} />
          ) : (
            <div className="grid sm:grid-cols-2 gap-5 lg:grid-cols-3 flex-1">
              {displayedItems?.map((item, key) => (
                <ToolCard
                  item={item}
                  type={item?.created_by}
                  key={key}
                  toolId={item.id}
                  pricing={
                    item?.created_by === "user"
                      ? item?.user_tool?.pricing
                      : item?.pricing
                  }
                />
              ))}
            </div>
          )}

          {latest && (
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
    </div>
  );
}

export default ExploreResult;
