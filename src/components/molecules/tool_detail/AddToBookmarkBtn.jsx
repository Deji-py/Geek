// "use client";
// import { Button } from "@/components/ui/button";

// import { Bookmark } from "lucide-react";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// function AddToBookmarkBtn({ toolId, type }) {
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const router = useRouter();

//   const checkIfInBookmark = async () => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         try {
//           const response = await instance.get(`/geeks_tools/create-bookmark/`);
//           const bookmarks = response.data;

//           const alreadyInBookmark = bookmarks.some(
//             (bookmark) =>
//               bookmark?.csv_tool?.id === toolId ||
//               bookmark?.combined_tool?.id === toolId
//           );

//           setIsBookmarked(alreadyInBookmark);
//         } catch (err) {
//           toast("Error checking bookmarks", { type: "error" });
//           setIsBookmarked(false);
//         }
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
//           const payload =
//             type === "user" || type === "premium_user"
//               ? { combined_tool_id: toolId }
//               : { csv_tool_id: toolId };
//           const result = await instance.post(
//             "/geeks_tools/create-bookmark/",
//             payload
//           );

//           if (result.data) {
//             toast("Added Successfully", { type: "success" });
//             setIsBookmarked(true);
//           }
//         } catch (err) {
//           toast("Can't add tool to bookmark", { type: "error" });
//         }
//       } else {
//         router.push("/login");
//       }
//     }
//   };

//   const handleDelete = () => {
//     router.push("/dashboard/favorite-tools");
//   };

//   return (
//     <Button
//       onClick={isBookmarked ? handleDelete : handleAddToBookmark}
//       className={`font-league top-0 right-1 h-10 gap-2 lg:px-6 px-4 border-[0.5px] border-primary text-primary hover:text-white hover:bg-primary bg-transparent text-base ${
//         isBookmarked ? "bg-primary text-white" : "bg-transparent"
//       }`}
//     >
//       <Bookmark className="w-5 lg:w-8" />
//     </Button>
//   );
// }

// export default AddToBookmarkBtn;
