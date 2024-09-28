// "use client";
// import React, { useEffect, useState } from "react";
// import megaphone from "../../../../public/images/png/megaphone.png";
// import adbanner from "../../../../public/images/png/adbanner.png";
// import premium from "../../../../public/images/png/premium.png";
// import newsletter2 from "../../../../public/images/png/newsletter2.png";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Dialog } from "primereact/dialog";
// import { MdLock } from "react-icons/md";
// import axios from "axios";

// import { LayoutIcon } from "lucide-react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// function Page() {
//   const [visible, setVisible] = useState(false);
//   const [selectToolVisible, setSelectToolVisible] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [tools, setTools] = useState([]);
//   const [selectedTool, setSelectedTool] = useState(null);
//   const [redirecting, setRedirecting] = useState(false);
//   const [currentProductType, setCurrentProductType] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("/api/stripe_pricing/");
//         const data = await response.data;
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const currentUser = localStorage.getItem("currentUser");
//       if (currentUser) {
//         setCurrentUser(JSON.parse(currentUser));
//       } else {
//         setCurrentUser(null);
//       }
//     }
//   }, []);

//   const fetchPublished = async () => {
//     try {
//       const response = await instance.get("/geeks_tools/individual-tools/");
//       setTools(response.data);
//     } catch (error) {
//       toast("Something went wrong", { type: "error" });
//     }
//   };

//   useEffect(() => {
//     fetchPublished();
//   }, []);

//   const checkoutToStripe = async (meta, currentProduct) => {
//     setRedirecting(true);
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         const parsedUser = JSON.parse(user);
//         try {
//           const response = await axios.post("/api/checkout_session/", {
//             email: parsedUser?.email,
//             name: currentProduct?.name,
//             price: currentProduct?.prices[0]?.id,
//             user_id: parsedUser?.user_id,
//             meta: {
//               ...meta,
//               userId: parsedUser?.user_id,
//               email: parsedUser?.email,
//             },
//           });

//           if (response) {
//             window.location.replace(response.data.session);
//           } else {
//             console.error("No session data in response");
//           }
//         } catch (error) {
//           console.error("Error fetching checkout session:", error);
//         }
//       } else {
//         router.push("/login");
//       }
//     }
//     setRedirecting(false);
//   };

//   const handleClick = async (type) => {
//     setCurrentProductType(type);
//     if (currentUser && !currentUser?.is_premium) {
//       setVisible(true);
//     } else {
//       setSelectToolVisible(true);
//     }
//   };

//   const handleToolSelection = async (tool) => {
//     setSelectedTool(tool);
//     setSelectToolVisible(false);

//     let meta = {};
//     let currentProduct = {};

//     switch (currentProductType) {
//       case "newsletter":
//         currentProduct = products.find((item) =>
//           item.name.includes("Newsletter")
//         );
//         meta = {
//           type: "newsletter",
//           toolname: tool.name,
//           toolId: tool.id,
//         };
//         break;
//       case "boost-week":
//         currentProduct = products.find((item) =>
//           item.name.includes("Sponsorship - One Week")
//         );
//         meta = {
//           type: "Boost-for-a-week",
//           toolname: tool.name,
//           toolId: tool.id,
//           duration: "7 days",
//         };
//         break;
//       case "boost-month":
//         currentProduct = products.find((item) =>
//           item.name.includes("Sponsorship - One Month")
//         );
//         meta = {
//           type: "Boost-for-a-month",
//           toolname: tool.name,
//           toolId: tool.id,
//           duration: "30 days",
//         };
//         break;
//       case "adbanner":
//         currentProduct = products.find((item) =>
//           item.name.includes("Ads Banner Placement")
//         );
//         meta = {
//           type: "ad-banner",
//           toolname: tool.name,
//           toolId: tool.id,
//           duration: "1 week",
//         };
//         break;
//       default:
//         break;
//     }

//     await checkoutToStripe(meta, currentProduct);
//   };

//   if (!currentUser) {
//     return (
//       <div className="w-full h-[70vh] flex flex-col justify-center items-center">
//         <div className="loader"></div>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full px-3 flex pb-20 flex-col justify-center items-center">
//       <div className="flex flex-col justify-center max-w-2xl text-center mt-8">
//         <h2 className="text-4xl font-semibold">Advertise with geek.tools</h2>
//         <p className="mt-4">
//           Maximize your brand&apos;s reach and impact with our comprehensive
//           sponsorship package on Geek.tools. Let&apos;s elevate your presence
//           together!
//         </p>
//       </div>
//       <div className="grid lg:grid-cols-2 gap-5 mt-10 w-full max-w-4xl">
//         {/* sponsorship */}
//         <div className="bg-secondary border border-primary p-5 rounded-2xl">
//           <div className="flex items-center gap-8">
//             <Image src={megaphone} className="w-20" alt="megaphone" />
//             <h1 className="text-3xl font-semibold">Sponsorship</h1>
//           </div>
//           <div className="prose marker:text-white mt-10 text-sm list-outside list-disc prose-invert">
//             <ul className="text-white">
//               <li>
//                 <span className="text-primary">Feature Spotlight:</span> Your
//                 brand prominently showcased on the homepage, ensuring maximum
//                 visibility to our engaged audience.
//               </li>
//               <li>
//                 <span className="text-primary">Feature Spotlight:</span> Your
//                 brand prominently showcased on the homepage, ensuring maximum
//                 visibility to our engaged audience.
//               </li>
//               <li>
//                 <span className="text-primary">Feature Spotlight:</span> Your
//                 brand prominently showcased on the homepage, ensuring maximum
//                 visibility to our engaged audience.
//               </li>
//               <li>
//                 <span className="text-primary">Feature Spotlight:</span> Your
//                 brand prominently showcased on the homepage, ensuring maximum
//                 visibility to our engaged audience.
//               </li>
//               <li>
//                 <span className="text-primary">Feature Spotlight:</span> Your
//                 brand prominently showcased on the homepage, ensuring maximum
//                 visibility to our engaged audience.
//               </li>
//             </ul>
//           </div>
//           <div className="lg:flex-row flex-col w-full flex mt-5 items-center justify-center gap-3">
//             <Button
//               onClick={() => handleClick("boost-week")}
//               className="font-normal lg:w-fit w-full mt-5 right-1 h-11 lg:h-10 gap-2 lg:px-3 px-5 primary_btn hover:text-white border-[0.5px] border-white text-black bg-white text-sm"
//             >
//               {redirecting && currentProductType === "boost-week" ? (
//                 <p>Please wait...</p>
//               ) : (
//                 <>
//                   {!currentUser?.is_premium && <MdLock size={20} />} Boost for a
//                   Week ($39)
//                 </>
//               )}
//             </Button>
//             <Button
//               onClick={() => handleClick("boost-month")}
//               className="font-normal items-center flex w-full lg:w-fit relative mt-5 right-1 h-11 lg:h-10 gap-2 px-5 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-sm"
//             >
//               {redirecting && currentProductType === "boost-month" ? (
//                 <p>Please wait...</p>
//               ) : (
//                 <>
//                   {!currentUser?.is_premium && <MdLock size={20} />}
//                   <p> Boost for a month ($99)</p>
//                   <div className="absolute bg-green-100 text-green-500 font-bold shadow h-4 flex flex-col justify-center items-center text-xs px-2 rounded-full -top-2 right-0">
//                     <p className="mt-1"> SAVE $60</p>
//                   </div>
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//         <div className="flex flex-col gap-5">
//           <div className="bg-secondary rounded-2xl flex flex-col p-5 border border-primary">
//             <div className="flex items-center gap-8">
//               <Image src={newsletter2} className="w-20" alt="megaphone" />
//               <h1 className="text-3xl font-semibold">Newsletter</h1>
//             </div>
//             <p className="text-sm mt-5">
//               Reach over 26,500 geeks with our weekly newsletter, ensuring your
//               brand gets exposure to a highly targeted audience. Only two spots
//               available each week.
//             </p>
//             <Button
//               onClick={() =>
//                 products && products?.length > 0 && handleClick("newsletter")
//               }
//               className="font-normal self-center mt-5 flex-wrap right-1 h-11 lg:h-10 gap-2 px-5 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-sm"
//             >
//               {redirecting && currentProductType === "newsletter" ? (
//                 <p>Please wait...</p>
//               ) : (
//                 <>
//                   {!currentUser?.is_premium && <MdLock size={20} />} $49 /
//                   newsletter
//                 </>
//               )}
//             </Button>
//           </div>
//           <div className="bg-secondary rounded-2xl flex flex-col p-5 border border-primary">
//             <div className="flex items-center gap-8">
//               <Image src={adbanner} className="w-20" alt="megaphone" />
//               <h1 className="text-3xl font-semibold">
//                 Banner <br />
//                 Ad Placement
//               </h1>
//             </div>
//             <p className="text-sm mt-5">
//               Place a banner (Gif or HTML ads allowed, size 300X250px) ad on the
//               explore and search pages, ensuring your brand is visible to users
//               actively seeking content and products. Only one spot available
//               each week.
//             </p>
//             <Button
//               onClick={() => handleClick("adbanner")}
//               className="font-normal self-center mt-5 flex-wrap right-1 h-11 lg:h-10 gap-2 px-5 primary_btn border-[0.5px] border-[#0A50FF] bg-primary text-sm"
//             >
//               {redirecting && currentProductType === "adbanner" ? (
//                 <p>Please wait...</p>
//               ) : (
//                 <>
//                   {!currentUser?.is_premium && <MdLock size={20} />} $99 / Week
//                 </>
//               )}
//             </Button>
//           </div>
//         </div>
//       </div>

//       <Dialog
//         headerStyle={{ color: "white" }}
//         headerClassName="bg-secondary"
//         contentClassName="bg-secondary"
//         className="relative !rounded-xl font-league text-white border-white bg-secondary"
//         visible={visible}
//         dismissableMask
//         showHeader={false}
//         onHide={() => {
//           if (!visible) return;
//           setVisible(false);
//         }}
//       >
//         <div className="text-white py-4 flex flex-col justify-center items-center">
//           <Image src={premium} className="w-20" alt="megaphone" />
//           <div className="text-orange-400 mt-5 font-bold text-lg lg:text-2xl">
//             This a Premium Feature
//           </div>
//           <p className="text-sm text-gray-300 w-[300px] text-center mt-3">
//             You have to be on premium plan to access these exciting premium
//             features
//           </p>
//           <a href="/pricing">
//             <Button className="font-normal self-center mt-5 flex-wrap right-1 h-11 lg:h-10 gap-2 px-5 primary_btn border-[0.5px] border-[#0A50FF] leading-none bg-primary text-base">
//               See Pricing
//             </Button>
//           </a>
//         </div>
//       </Dialog>

//       <Dialog
//         headerStyle={{ color: "white" }}
//         headerClassName="bg-secondary"
//         contentClassName="bg-secondary"
//         className="relative !rounded-xl  lg:w-[300px] w-[98vw] font-league text-white border-white bg-secondary"
//         visible={selectToolVisible}
//         dismissableMask
//         showHeader={false}
//         onHide={() => {
//           if (!selectToolVisible) return;
//           setSelectToolVisible(false);
//         }}
//       >
//         <div className="text-white py-4 flex flex-col justify-center items-center">
//           <h1>Choose the tool</h1>
//           <RadioGroup className="mt-4 w-full">
//             {tools.map((tool) => (
//               <div
//                 key={tool.id}
//                 className="flex items-center gap-3 justify-between  p-2 hover:bg-gray-900 cursor-pointer"
//                 onClick={() => handleToolSelection(tool)}
//               >
//                 <div className=" flex  flex-1 items-center gap-4">
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${tool?.user_tool?.logo}`}
//                     className=" w-8 h-8"
//                   />
//                   <div>
//                     <span>{tool?.user_tool.name}</span>
//                     <p className=" text-xs text-gray-500">
//                       {tool?.user_tool?.category?.name}
//                     </p>
//                   </div>
//                 </div>
//                 <RadioGroupItem value={tool.id} />
//               </div>
//             ))}
//           </RadioGroup>
//         </div>
//       </Dialog>
//     </section>
//   );
// }

// export default Page;
