"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PricingPlan from "./tabs/pricing_plan";
import ToolInformation from "./tabs/tool_Information";
import SubmitTool from "./tabs/submit";
import BasicInformation from "./tabs/basic_Information";

function ToolSubmitDialog({ isEdit = false, currentItem, isDraft = false }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isFree, setIsFree] = useState(true);

  useEffect(() => {
    if (isEdit) {
      if (currentItem?.user_tool?.pricing === "Free") {
        setIsFree(true);
      } else {
        setIsFree(false);
      }
    }
  }, []);

  // Function to move to the next tab
  const goToNextTab = () => {
    setActiveTabIndex((prevIndex) => prevIndex + 1);
  };
  const goToPrevTab = () => {
    setActiveTabIndex((prevIndex) => prevIndex - 1);
  };
  const tabs = [
    {
      name: "Basic Information",
      component: (
        <BasicInformation
          setIsFree={setIsFree}
          next={goToNextTab}
          currentItem={currentItem}
          isEdit={isEdit}
          isDraft={isDraft}
        />
      ),
    },
    ...(isFree
      ? []
      : [
          {
            name: "Pricing Plan",
            component: <PricingPlan next={goToNextTab} prev={goToPrevTab} />,
          },
        ]),
    {
      name: "Tool Information",
      component: (
        <ToolInformation
          currentItem={currentItem}
          isEdit={isEdit}
          next={goToNextTab}
          prev={goToPrevTab}
        />
      ),
    },
    { name: "Finish Setup", component: <SubmitTool prev={goToPrevTab} /> },
  ];

  return (
    <div className=" flex flex-col h-full relative   ">
      <Tabs
        defaultValue={tabs[activeTabIndex]}
        className="w-full  sticky top-0 z-[1000] left-0 !rounded-none  bg-secondary"
        activeIndex={activeTabIndex}
      >
        <TabsList>
          {tabs.map((item, index) => (
            <TabsTrigger
              key={item.name}
              value={item.name}
              data-state={index === activeTabIndex ? "active" : "inactive"}
              disabled={index !== activeTabIndex}
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className=" flex-1 hideScroll text-white !font-league px-1  overflow-y-scroll">
        {tabs[activeTabIndex].component}
        <div className="h-3  "></div>
      </div>
    </div>
  );
}

export default ToolSubmitDialog;
