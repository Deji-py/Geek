import Addlist_Input from "@/components/atoms/Addlist_Input";
import TextInput from "@/components/atoms/TextInput";
import React from "react";
import timeline from "../json/timeline.json";
import SelectInput from "@/components/atoms/SelectInput";

function PricingPlanForm({
  setFeatures,
  setPlan,
  setPrice,
  features,
  setSelectedTimeline,
  selectedTimeline,
  price,
  plan,
}) {
  return (
    <div>
      <TextInput
        placeholder={"Eg. Basic Plan"}
        field={{
          onChange: (e) => {
            setPlan(e.target.value);
          },
          value: plan,
        }}
        title={"Package name"}
      />
      <Addlist_Input
        list={features}
        setList={setFeatures}
        max={10}
        placeholder={"e.g ai generated logo"}
        title={"Features"}
      />
      <TextInput
        title={"Pricing"}
        isPrice
        type={"number"}
        field={{
          onChange: (e) => {
            setPrice(e.target.value);
          },
          value: price,
        }}
      />
      <SelectInput
        setSelected={setSelectedTimeline}
        selected={selectedTimeline}
        items={timeline}
        title={"Timeline"}
      />
    </div>
  );
}

export default PricingPlanForm;
