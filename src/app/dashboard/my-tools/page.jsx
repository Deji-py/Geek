// "use client";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import PublishedTools from "./tool_submit_dialog/PublishedTools";
// import Drafts from "./tool_submit_dialog/Drafts";
// import { useEffect, useState } from "react";

// function MyTools() {
//   const [drafts, setDrafts] = useState(0);

//   const fetchDraft = async () => {
//     try {
//       const response = await instance.get("/geeks_tools/draft/");
//       setDrafts(response.data?.length);
//     } catch (err) {
//       setDrafts(0);
//     }
//   };

//   useEffect(() => {
//     fetchDraft();
//   }, [setDrafts]);

//   return (
//     <div className=" flex flex-col   lg:justify-start justify-center items-center w-full">
//       <Tabs
//         defaultValue="published"
//         className="w-full flex  flex-col  justify-center items-center max-w-7xl"
//       >
//         <TabsList className="grid mt-0   glassmorphism lg:w-[250px] lg:px-0  w-fit px-8 lg:gap-5 gap-10 grid-cols-2">
//           <TabsTrigger value="published">Published</TabsTrigger>
//           <TabsTrigger value="draft">Drafts({drafts})</TabsTrigger>
//         </TabsList>
//         <TabsContent className="w-full" value="published">
//           <PublishedTools />
//         </TabsContent>
//         <TabsContent className="w-full" value="draft">
//           <Drafts />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

// export default MyTools;
