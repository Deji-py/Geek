// import Pricing_Card from "@/components/molecules/shared/Pricing_Card";
// import { Button } from "@/components/ui/button";
// import PricingPlanForm from "@/forms/PricingPlanForm";

// import { Plus } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { toast } from "react-toastify";

// function PricingPlan({ next, prev }) {
//   const [allPricing, setAllPricing] = useState([]);
//   const [features, setFeatures] = useState([]);
//   const [plans, setPlans] = useState("");
//   const [price, setPrice] = useState("");
//   const [timeline, setTimeline] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const toolname = useSelector(
//     (state) => state.toolReducer.basic_information.name
//   );

//   const AddToList = () => {
//     if (
//       plans.trim() !== "" &&
//       features.length > 0 &&
//       price.trim() !== "" &&
//       timeline
//     ) {
//       setAllPricing((pricing) => [
//         ...pricing,
//         {
//           package_name: plans,
//           features: features,
//           Pricing: price,
//           timeline: timeline?.name,
//         },
//       ]);

//       setPlans("");
//       setFeatures([]);
//       setPrice("");
//       setTimeline(null);
//     } else {
//       toast("All Fields are required", { type: "error" });
//     }
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     try {
//       const requests = allPricing?.map((data) =>
//         instance.post("/geeks_tools/setup/", data)
//       );
//       const results = await Promise.all(requests);
//       if (results) {
//         toast("Successfully Added Tool Pricing", { type: "success" });
//         next();
//       }
//     } catch (e) {
//       toast("An Error occurred", { type: "error" });
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="pt-5 h-full ">
//       {loading && (
//         <div className=" w-full flex flex-col left-0 justify-center items-center h-full z-[1000] bg-black/15 backdrop-blur-sm absolute top-0">
//           <div className="loader"></div>
//         </div>
//       )}
//       <div className=" flex gap-3 h-full  flex-col lg:flex-row justify-start items-start w-full">
//         <div className="lg:w-[50%] w-full ">
//           <h2 className="lg:text-xl text-lg">Setup Pricing for {toolname}</h2>
//           <PricingPlanForm
//             selectedTimeline={timeline}
//             setSelectedTimeline={setTimeline}
//             features={features}
//             setPrice={setPrice}
//             setPlan={setPlans}
//             setFeatures={setFeatures}
//             price={price}
//             plan={plans}
//           />
//           <Button
//             onClick={AddToList}
//             className="mt-5 primary_btn justify-between w-full"
//           >
//             <Plus className="w-5" />
//             Add Pricing
//           </Button>
//         </div>

//         {allPricing.length > 0 ? (
//           <div className=" flex-1 rounded-md glassmorphism p-2 w-full overflow-y-scroll h-full">
//             <p className=" text-gray-500 mb-2">All Pricing</p>
//             {allPricing.map((item, index) => (
//               <Pricing_Card key={index} item={item} />
//             ))}
//           </div>
//         ) : (
//           <div className=" text-slate-500 text-sm text-center justify-center items-center flex-1 rounded-md glassmorphism p-2 w-full h-full">
//             Your Pricing Plans will appear here
//           </div>
//         )}
//       </div>
//       <div className=" w-full mt-5  justify-end items-center flex ">
//         <Button
//           disabled={allPricing.length === 0}
//           onClick={handleSubmit}
//           className=" !px-10  self-end font-normal text-md lg:text-lg primary_btn"
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default PricingPlan;
