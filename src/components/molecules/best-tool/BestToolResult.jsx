import React from "react";
import ToolCard from "../shared/ToolCard";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, SortAsc, SortDesc, icons } from "lucide-react";
import SelectInput from "@/components/atoms/SelectInput";
import Search_And_Select_Input from "@/components/atoms/Search_And_Select_Input";
import search_and_select_categories from "../../../json/search_and_select_categories.json";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BestToolCard from "../shared/Best_Tool_Card";

const categories = [
  {
    name: "A Cateory",
  },
  {
    name: "Another category",
  },
];

const sort = [
  {
    name: "Ascending",
    icon: <SortAsc size={18} />,
  },
  {
    name: "Descrending",
    icon: <SortDesc size={18} />,
  },
];

const pricing = [
  {
    value: "free",
    label: "Free",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "freemium",
    label: "Freemium",
  },
];

function BestToolReslt() {
  return (
    <section className=" flex-col px-3 lg:px-0 relative  flex w-full gap-3 max-w-7xl my-5 items-start">
      <div className=" lg:h-[7rem] rounded-full   w-[6rem] h-[6rem] lg:w-[7rem] absolute right-0  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>

      <div className=" lg:h-[7rem] rounded-full   w-[6rem] h-[6rem] lg:w-[7rem] absolute bottom-0 left-20  bg-[hsl(223,100%,80%)] blur-[100px] lg:blur-[100px]"></div>
      <h1 className=" text-2xl px-10 sm:hidden pt-14 text-center">
        List of the Top Developer tools in 2024
      </h1>
      <div className="w-full pb-5 pt-10  lg:justify-between justify-end  flex items-center">
        <h1 className=" text-4xl sm:block hidden  text-center">
          List of the Top Developer tools in 2024
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-normal  relative z-50     right-1 h-10 gap-4  hover:bg-primary border-[0.5px] border-glassBorder bg-secondary/50 text-base lg:text-lg">
              <Filter size={20} /> Filter
            </Button>
          </DialogTrigger>
          <DialogContent className="z-[3000] rounded-xl bg-secondary w-[95%] max-w-[400px] p-2 overflow-y-scroll hideScroll h-fit border border-glassBorder">
            <div className="  h-fit flex-none p-3  rounded-md ">
              <h3 className="text-xl mb-8 ">Filter Result</h3>
              <SelectInput
                showSearch={true}
                items={categories}
                title={"Categories"}
                className={"flex-1"}
              />
              <SelectInput
                items={sort}
                title={"Sort by"}
                className={"flex-1"}
              />
              <Search_And_Select_Input
                options={search_and_select_categories}
                title={"Pricing Type"}
              />
              <Button className=" mt-5 font-normal w-full text-md primary_btn  border border-primary">
                Apply Filter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full">
        <div className=" gap-5 w-full   space-y-4">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <BestToolCard key={index} />
          ))}
        </div>
        <div className=" flex items-center  justify-center mt-8">
          <Button
            className={"h-8 bg-secondary border-glassBorder border  gap-2"}
          >
            Load More <ReloadIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BestToolReslt;
