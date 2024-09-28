// "use client";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   ArrowUpRightFromSquare,
//   BookmarkIcon,
//   EyeIcon,
//   HomeIcon,
//   Pen,
//   TrashIcon,
// } from "lucide-react";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { MdVerified } from "react-icons/md";
// import ailogo from "../../../../public/images/svg/ailogo.svg";
// import no_image from "../../../../public/images/png/no_img.png";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { containsAI } from "@/helpers/containsAi";

// import {
//   Dialog as ShadDialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// import { toast } from "react-toastify";
// import ToolSubmitDialog from "@/app/dashboard/my-tools/tool_submit_dialog/ToolSubmitDialog";
// import { Dialog } from "primereact/dialog";
// import { Sidebar } from "primereact/sidebar";
// import { useRouter } from "next/navigation";

// function ToolCard({
//   isFeatured,
//   pricing,
//   isFavourite,
//   item,
//   callback,
//   toolId,
//   isDraft,
//   isPublished,
//   setItem,
//   editTool,
//   type,
//   isCurrentUser,
//   isSponsored,
//   bookmarkId,
// }) {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   // const [loginDialogOpen, setLoginDialogOpen] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const router = useRouter();

//   // const handleEditTool = () => {
//   //   setItem(item);
//   //   editTool();
//   // };

//   const handleDelete = async () => {
//     try {
//       const response = await instance.delete(
//         `/geeks_tools/update-bookmark/${bookmarkId}/`
//       );

//       if (response) {
//         toast("Tool Deleted Successfully", { type: "success" });
//         setIsBookmarked(false);
//         checkIfInBookmark();
//         callback();
//       }
//     } catch (e) {}
//     setIsDialogOpen(false);
//   };

//   const checkIfInBookmark = async () => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         try {
//           const bookmarks = await instance.get(`/geeks_tools/create-bookmark/`);

//           if (bookmarks.data) {
//             const alreadyInBookmark = bookmarks.data.some(
//               (bookmark) =>
//                 (bookmark?.combined_tool?.id || bookmark?.csv_tool?.id) ===
//                 toolId
//             );

//             setIsBookmarked(alreadyInBookmark);
//           }
//         } catch (err) {
//           setIsBookmarked(false);
//         }
//       } else {
//         setIsBookmarked(false);
//       }
//     }
//   };

//   useEffect(() => {
//     checkIfInBookmark();
//   }, []);

//   const handleAddToBookmark = async () => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         try {
//           if (type === "user" || type === "premium_user") {
//             const result = await instance.post(
//               "/geeks_tools/create-bookmark/",
//               {
//                 combined_tool_id: toolId,
//               }
//             );
//             if (result.data) {
//               toast("Added Successfully", { type: "success" });
//               setIsBookmarked(true);
//             }
//           } else {
//             const result = await instance.post(
//               "/geeks_tools/create-bookmark/",
//               {
//                 csv_tool_id: toolId,
//               }
//             );
//             if (result.data) {
//               toast("Added Successfully", { type: "success" });
//               setIsBookmarked(true);
//             }
//           }
//         } catch (err) {
//           toast("Cant add tool to bookmark", { type: "error" });
//         }
//       } else {
//         router.push("/login");
//       }
//     }
//   };

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   return (
//     <div>
//       {/* <LoginDialog
//         loginDialogOpen={loginDialogOpen}
//         setLoginDialogOpen={setLoginDialogOpen}
//       /> */}
//       <ShadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <div className="flex flex-col  h-[260px] w-full  justify-center group items-center relative">
//           <div className="h-full absolute group-hover:rotate-2 rotate-0 transition-all rounded-lg origin-top-left duration-300 left-0 bg-gradient-to-r from-primary to-greeny p-3 top-0 w-full"></div>
//           <div
//             className={cn(
//               isFeatured
//                 ? "bg-[#141B29] border border-[hsl(223,38%,30%)]"
//                 : "bg-secondary border border-glassBorder",
//               "cursor-pointer relative flex flex-col transition-all duration-300 rounded-lg p-3 w-full h-full"
//             )}
//           >
//             <div className="w-full flex items-start justify-start">
//               <div className=" w-[50%] flex-1 overflow-hidden ">
//                 <div className="flex items-center gap-3">
//                   <a
//                     href={isDraft ? "#" : `/tool/${toolId}?type=${type}`}
//                     className="w-14 h-14 flex-none overflow-hidden rounded-lg  bg-white"
//                   >
//                     <img
//                       width={1000}
//                       height={1000}
//                       alt="tool"
//                       src={
//                         type === "user" || type === "premium_user"
//                           ? item?.user_tool?.logo
//                             ? !item?.user_tool?.logo.includes(
//                                 process.env.NEXT_PUBLIC_API_BASE_URL
//                               )
//                               ? `${item?.user_tool.logo}`
//                               : `${item?.user_tool.logo}`
//                             : no_image
//                           : item?.logo || no_image
//                       }
//                       className="w-full h-full object-cover"
//                     />
//                   </a>
//                   <div className=" flex-1  ">
//                     <a
//                       href={isDraft ? "#" : `/tool/${toolId}?type=${type}`}
//                       className="text-lg  flex-1 w-[80%] relative  flex items-start gap-1"
//                     >
//                       <p className=" flex items-start flex-1 relative text-ellipsis">
//                         <span className=" w-fit  relative ">
//                           {type === "user" || type === "premium_user"
//                             ? item?.user_tool?.name?.length > 15
//                               ? item?.user_tool?.name?.slice(0, 15) + "..."
//                               : item?.user_tool?.name
//                             : item?.name?.length > 15
//                             ? item?.name?.slice(0, 15) + "..."
//                             : item?.name}
//                           {isFeatured && (
//                             <span className="bg-white rounded-full w-3  h-3 flex flex-col justify-center items-center  absolute top-0  -right-5">
//                               <MdVerified className="w-[1.1rem] h-[1.1rem] flex-none  svg_glow   z-50 text-primary" />
//                             </span>
//                           )}
//                         </span>
//                       </p>
//                     </a>
//                     <Badge
//                       className={
//                         "font-light cursor-pointer pl-2 text-white  bg-teal-700  rounded-full"
//                       }
//                     >
//                       <a
//                         href={`/search/?query=${
//                           item?.category || item?.user_tool?.category?.name
//                         }`}
//                       >
//                         {type === "user" || type === "premium_user"
//                           ? item?.user_tool?.category?.name
//                           : item?.category}
//                       </a>
//                     </Badge>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex flex-none items-center gap-3">
//                 {type === "user" || type === "premium_user" ? (
//                   item?.user_tool?.hashtag.some((hashtag) =>
//                     containsAI(hashtag?.term)
//                   ) && (
//                     <TooltipProvider>
//                       <Tooltip>
//                         <TooltipTrigger className=" flex-none">
//                           <Image
//                             src={ailogo}
//                             className="w-6 h-6 flex-none"
//                             alt="aiLogo"
//                           />
//                         </TooltipTrigger>
//                         <TooltipContent>
//                           <p>AI Tool</p>
//                         </TooltipContent>
//                       </Tooltip>
//                     </TooltipProvider>
//                   )
//                 ) : (
//                   <>
//                     {item?.hashtag?.some((hashtag) =>
//                       containsAI(hashtag?.term)
//                     ) && (
//                       <TooltipProvider>
//                         <Tooltip>
//                           <TooltipTrigger className=" flex-none">
//                             <Image
//                               src={ailogo}
//                               className="w-6 h-6 flex-none"
//                               alt="aiLogo"
//                             />
//                           </TooltipTrigger>
//                           <TooltipContent>
//                             <p>AI Tool</p>
//                           </TooltipContent>
//                         </Tooltip>
//                       </TooltipProvider>
//                     )}
//                   </>
//                 )}
//                 {isPublished ? (
//                   <>
//                     <a
//                       href={isDraft ? "#" : `/tool/${toolId}?type=${type}`}
//                       className=" glassmorphism p-2 hover:border hover:border-gray-600 cursor-pointer "
//                     >
//                       <EyeIcon />
//                     </a>
//                   </>
//                 ) : (
//                   // <div
//                   //   onClick={handleEditTool}
//                   //   className=" glassmorphism p-2 hover:border hover:border-gray-600 cursor-pointer "
//                   // >
//                   //   <Edit2Icon size={20} />
//                   // </div>
//                   <>
//                     {isDraft ? (
//                       <div className=" italic">(Draft)</div>
//                     ) : (
//                       <TooltipProvider>
//                         {isFavourite ? (
//                           <Tooltip>
//                             <TooltipTrigger onClick={openDialog}>
//                               <TrashIcon
//                                 className="hover:fill-white"
//                                 size={22}
//                               />
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Delete</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         ) : (
//                           <Tooltip>
//                             <TooltipTrigger>
//                               <BookmarkIcon
//                                 onClick={
//                                   !isBookmarked
//                                     ? handleAddToBookmark
//                                     : handleDelete
//                                 }
//                                 className={`hover:text-primary hover:fill-primary  ${
//                                   isBookmarked && "fill-primary text-primary"
//                                 }`}
//                                 size={22}
//                               />
//                             </TooltipTrigger>
//                             <TooltipContent>
//                               <p>Bookmark</p>
//                             </TooltipContent>
//                           </Tooltip>
//                         )}
//                       </TooltipProvider>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             <div className="text-sm py-3 font-light w-full pr-10 lg:pr-0">
//               <div>
//                 <a
//                   href={isDraft ? "#" : `/tool/${toolId}?type=${type}`}
//                   className=" text-wrap break-all w-full "
//                 >
//                   {type === "user" || type === "premium_user"
//                     ? item?.user_tool?.intro?.length > 120
//                       ? item?.user_tool?.intro?.slice(0, 120) + "..."
//                       : item?.user_tool?.intro
//                     : item?.intro?.length > 120
//                     ? item?.intro?.slice(0, 120) + "..."
//                     : item?.intro}
//                 </a>
//                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4">
//                   {type === "user" || type === "premium_user" ? (
//                     <>
//                       {item?.user_tool?.hashtag
//                         ?.slice(0, 3)
//                         .map((tag, index) => (
//                           <a
//                             href={`/search/?query=${tag.term}`}
//                             key={index}
//                             className="underline text-xs hover:text-primary"
//                           >
//                             {tag.term}
//                           </a>
//                         ))}
//                     </>
//                   ) : (
//                     <>
//                       {item?.hashtag?.slice(0, 3).map((tag, index) => (
//                         <a
//                           href="#"
//                           key={index}
//                           className="underline text-xs hover:text-primary"
//                         >
//                           {tag}
//                         </a>
//                       ))}
//                     </>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {isCurrentUser && (
//               <div className=" flex mt-2 items-center gap-2">
//                 {type === "premium_user" && (
//                   <div className=" flex items-center text-xs">
//                     <div className=" flex gap-1 items-center">
//                       <HomeIcon className="-mt-1" size={10} />
//                       <p className=" leading-none"> Home</p>
//                     </div>
//                     <div className=" flex items-center py-0.5  ml-1 px-1 rounded-full  leading-none text-[0.6rem] bg-blue-100 text-blue-700">
//                       Active (7days)
//                     </div>
//                   </div>
//                 )}

//                 <>
//                   {isSponsored && (
//                     <div className=" flex items-center text-xs">
//                       <div className=" flex gap-1 items-center">
//                         <MdVerified className="-mt-1 text-primary" size={12} />
//                         <p className=" leading-none"> Sponsored (7days)</p>
//                       </div>
//                     </div>
//                   )}
//                 </>
//               </div>
//             )}

//             <div
//               className={cn(
//                 pricing === "Paid" && "text-[#0AD9BE]",
//                 pricing === "Freemium" && "text-yellow-400",
//                 "text-lg flex flex-1 mt-3 items-end justify-between"
//               )}
//             >
//               <p>{pricing}</p>

//               {isDraft ? (
//                 <>
//                   {/* Desktop Dialogue */}

//                   <Button
//                     onClick={() => setVisible(true)}
//                     className="mt-3 hidden border border-secondary lg:flex font-normal  items-center !text-base   pt-1.5 lg:text-lg primary_btn"
//                   >
//                     <Pen size={16} />
//                     <p className="mt-0.5 px-2"> Continue </p>
//                   </Button>

//                   <Dialog
//                     header="Draft"
//                     headerStyle={{ color: "white" }}
//                     headerClassName="bg-secondary"
//                     contentClassName="bg-secondary "
//                     dismissableMask
//                     className="relative !rounded-xl font-league text-glassBorder border-glassBorder  bg-secondary"
//                     visible={visible}
//                     style={{ width: "60vw", height: "700px" }}
//                     onHide={() => {
//                       if (!visible) return;
//                       setVisible(false);
//                     }}
//                   >
//                     <ToolSubmitDialog isDraft currentItem={item} />
//                   </Dialog>
//                   {/* ------------ */}

//                   {/* Mobile Sheet */}

//                   <Button
//                     onClick={() => setOpenSidebar(true)}
//                     className="mt-5 gap-2 lg:hidden flex items-center font-normal text-md lg:text-lg primary_btn"
//                   >
//                     <Pen size={16} />
//                     <p>Continue </p>
//                   </Button>

//                   <Sidebar
//                     header="Draft"
//                     className="relative !rounded-xl !hideScroll font-league text-glassBorder border-glassBorder   bg-secondary"
//                     fullScreen
//                     visible={openSidebar}
//                     onHide={() => setOpenSidebar(false)}
//                   >
//                     <ToolSubmitDialog isDraft currentItem={item} />
//                   </Sidebar>
//                 </>
//               ) : (
//                 <a
//                   target="_blank"
//                   href={
//                     type === "user" || type === "premium_user"
//                       ? item?.user_tool?.url
//                       : item?.url
//                   }
//                 >
//                   <Button className="primary_btn text-[15px] lg:h-8 h-9 font-normal">
//                     Visit
//                     <ArrowUpRightFromSquare className="w-4 h-4 ml-3" />
//                   </Button>
//                 </a>
//               )}
//             </div>
//           </div>

//           <DialogContent className="sm:max-w-[425px] z-[10000] glassmorphism">
//             <DialogHeader>
//               <DialogTitle>Delete Tool</DialogTitle>
//               <DialogDescription className={"text-gray-400 text-base"}>
//                 Are you sure you want to delete the tool?
//               </DialogDescription>
//             </DialogHeader>
//             <DialogFooter className="mt-5">
//               <div className="flex justify-end gap-4 items-center">
//                 <Button className="primary_btn !h-8" onClick={handleDelete}>
//                   Yeah! Sure
//                 </Button>
//                 <Button
//                   className="!bg-red-500/50 border-[0.5px] border-red-500 backdrop-blur-sm hover:!bg-red-600 !h-8"
//                   onClick={closeDialog}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </DialogFooter>
//           </DialogContent>
//         </div>
//       </ShadDialog>
//     </div>
//   );
// }

// export default ToolCard;
