// "use client";
// import ToolCard from "@/components/molecules/shared/ToolCard";
// import { Button } from "@/components/ui/button";

// import { ReloadIcon } from "@radix-ui/react-icons";
// import empty from "../../../../../public/images/png/empty-box.png";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import Image from "next/image";

// const EmptyDrafts = () => {
//   return (
//     <div className="w-full h-[calc(100%-150px)] lg:h-[80%] flex flex-col justify-center items-center">
//       <div className="text-center flex flex-col justify-center items-center ">
//         <Image src={empty} className="w-32" alt="empty" />
//         <div className="text-center flex flex-col justify-center items-center mt-8">
//           <h3>You Draft is currently empty</h3>
//           <p className="text-sm text-gray-400 font-light">
//             Your drafts will automatically appear here
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// function Drafts() {
//   const [tools, setTools] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isError, setIsError] = useState(false);

//   const fetchDraft = async () => {
//     setLoading(true);

//     try {
//       const response = await instance.get("/geeks_tools/draft/");
//       setTools(response.data);

//       setIsError(false);
//     } catch (err) {
//       setIsError(true);
//       toast("Something went wrong!", { type: "error" });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchDraft();
//   }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-[70vh] flex flex-col justify-center  items-center">
//         <div className=" loader"></div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className=" w-full h-[80vh] lg:h-screen text-center flex flex-col justify-center items-center">
//         <h2 className=" text-xl font-semibold mb-2">Something went wrong</h2>
//         <h3 className=" text-gray-400">Could not load profile</h3>
//         <Button
//           className={
//             " bg-secondary border-glassBorder mt-4 border-[0.5px] text-md hover:bg-glassBorder  font-normal lg:text-lg"
//           }
//           onClick={fetchDraft}
//         >
//           Retry
//           <ReloadIcon className=" ml-2 " />
//         </Button>
//       </div>
//     );
//   }
//   return (
//     <div className="w-full lg:pt-6 pt-1">
//       {tools && tools.length > 0 ? (
//         <>
//           <div className="w-full gap-4 lg:grid mt-1 grid-cols-4 px-2 ">
//             {tools?.map((item, index) => (
//               <ToolCard
//                 isDraft
//                 key={index}
//                 type={item?.created_by}
//                 pricing={item?.user_tool.pricing}
//                 toolId={item?.id}
//                 item={item}
//               />
//             ))}
//           </div>
//           <div className=" w-full lg:mt-32 flex flex-col justify-center  items-center">
//             <p className=" px-20 mt-10 flex items-start gap-0 text-xs text-center text-slate-500">
//               Please note that drafts are automatically deleted after sometime
//             </p>
//           </div>
//         </>
//       ) : (
//         <div className="w-full max-w-7xl  h-[70vh]  lg:h-[70vh] flex flex-col justify-center items-center ">
//           <EmptyDrafts />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Drafts;
