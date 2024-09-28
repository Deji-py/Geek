// "use client";
// import React, { useEffect, useState } from "react";
// import gridlayout from "../../../../../public/images/svg/gridlayout.svg";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import ToolSubmitDialog from "../tool_submit_dialog/ToolSubmitDialog";
// import { Dialog } from "primereact/dialog";
// import { Sidebar } from "primereact/sidebar";

// import ToolCard from "@/components/molecules/shared/ToolCard";
// import { toast } from "react-toastify";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import { PlusIcon } from "lucide-react";
// import layers from "../../../../../public/images/png/layers.png";

// const EmptyTools = () => {
//   const [visible, setVisible] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);

//   return (
//     <div className="w-full h-[calc(100%-150px)] lg:h-[90%] flex flex-col justify-center items-center">
//       <Image src={layers} className="w-24" alt="layers" />
//       <div className="text-center flex flex-col justify-center items-center mt-8">
//         <h3>You have not published any tool yet</h3>
//         <p className="text-sm text-gray-400 font-light">
//           Click the button below to upload your awesome tool
//         </p>

//         {/* Desktop Dialogue */}

//         <Button
//           onClick={() => setVisible(true)}
//           className="mt-3 hidden border border-secondary lg:block font-normal !text-base   pt-1.5 lg:text-lg primary_btn"
//         >
//           <p className="mt-0.5 px-2">Submit a tool</p>
//         </Button>

//         <Dialog
//           header="Submit a tool"
//           dismissableMask={false}
//           draggable={false}
//           headerStyle={{ color: "white" }}
//           headerClassName="bg-secondary"
//           contentClassName="bg-secondary "
//           className="relative !rounded-xl font-league text-glassBorder border-glassBorder  bg-secondary"
//           visible={visible}
//           style={{ width: "60vw", height: "700px" }}
//           onHide={() => {
//             if (!visible) return;
//             setVisible(false);
//           }}
//         >
//           <ToolSubmitDialog />
//         </Dialog>
//         {/* ------------ */}

//         {/* Mobile Sheet */}

//         <Button
//           onClick={() => setOpenSidebar(true)}
//           className="mt-5  lg:hidden block font-normal text-md lg:text-lg primary_btn"
//         >
//           Submit a tool
//         </Button>

//         <Sidebar
//           header="Submit a tool"
//           className="relative !rounded-xl !hideScroll font-league text-glassBorder border-glassBorder   bg-secondary"
//           fullScreen
//           visible={openSidebar}
//           onHide={() => setOpenSidebar(false)}
//         >
//           <ToolSubmitDialog />
//         </Sidebar>

//         {/* -------------- */}
//       </div>
//     </div>
//   );
// };

// function PublishedTools() {
//   const [visible, setVisible] = useState(false);
//   const [tools, setTools] = useState(null);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [openEditDialog, setOpenEditDialog] = useState(false);
//   const [currentItem, setCurrentItem] = useState(null);

//   const fetchPublished = async () => {
//     setLoading(true);

//     try {
//       const response = await instance.get("/geeks_tools/individual-tools/");
//       setTools(response.data);

//       setIsError(false);
//     } catch (error) {
//       setIsError(true);
//       toast("Something went wrong", { type: "error" });
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchPublished();
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
//           onClick={fetchPublished}
//         >
//           Retry
//           <ReloadIcon className=" ml-2 " />
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className=" pt-1 lg:pt-6 lg:px-0">
//       {tools && tools.length > 0 ? (
//         <>
//           <Button
//             onClick={() => setVisible(true)}
//             className="mt-5 fixed  gap-3  items-center right-5 bottom-5  lg:flex hidden  font-normal text-md lg:text-lg primary_btn"
//           >
//             <PlusIcon />
//             Submit tool
//           </Button>

//           <Dialog
//             header="Submit a tool"
//             headerStyle={{ color: "white" }}
//             dismissableMask={false}
//             draggable={false}
//             headerClassName="bg-secondary"
//             contentClassName="bg-secondary "
//             className="relative !rounded-xl font-league text-glassBorder border-glassBorder  bg-secondary"
//             visible={visible}
//             style={{ width: "50vw", height: "700px" }}
//             onHide={() => {
//               if (!visible) return;
//               setVisible(false);
//             }}
//           >
//             <ToolSubmitDialog />
//           </Dialog>
//           {/* ------------ */}

//           {/* Mobile Sheet */}

//           <Button
//             onClick={() => setOpenSidebar(true)}
//             className="mt-5 fixed z-[100]  gap-3 flex items-center right-5 bottom-20  lg:hidden  font-normal text-md lg:text-lg primary_btn"
//           >
//             <PlusIcon />
//             Submit tool
//           </Button>

//           <Sidebar
//             header="Submit a tool"
//             className="relative !rounded-xl !hideScroll font-league text-glassBorder border-glassBorder   bg-secondary"
//             fullScreen
//             visible={openSidebar}
//             onHide={() => setOpenSidebar(false)}
//           >
//             <ToolSubmitDialog />
//           </Sidebar>
//           <div className="w-full gap-4 grid mt-1 lg:grid-cols-4 px-2 ">
//             {tools?.map((item, index) => (
//               <ToolCard
//                 isCurrentUser={true}
//                 type={item?.created_by}
//                 editTool={() => setOpenEditDialog(true)}
//                 isPublished
//                 setItem={setCurrentItem}
//                 key={index}
//                 pricing={item?.user_tool.pricing}
//                 toolId={item?.id}
//                 item={item}
//               />
//             ))}
//           </div>

//           {/* For Editing Published Tool */}
//           <Dialog
//             header="Edit Tool"
//             headerStyle={{ color: "white" }}
//             headerClassName="bg-secondary"
//             contentClassName="bg-secondary "
//             className="relative !rounded-xl lg:!max-w-[50vw] lg:!h-[700px] !h-screen !w-full font-league text-glassBorder border-glassBorder  bg-secondary"
//             visible={openEditDialog}
//             onHide={() => {
//               if (!openEditDialog) return;
//               setOpenEditDialog(false);
//             }}
//           >
//             <ToolSubmitDialog isEdit currentItem={currentItem} />
//           </Dialog>
//           {/* ------------ */}
//         </>
//       ) : (
//         <div className="w-full max-w-7xl  h-[70vh]  lg:h-[70vh] flex flex-col justify-center items-center ">
//           <EmptyTools />
//         </div>
//       )}

//       {/* -------------- */}
//     </div>
//   );
// }

// export default PublishedTools;
