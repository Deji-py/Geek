// "use client";
// import G_TextArea from "@/components/atoms/G_TextArea";
// import { Button } from "@/components/ui/button";
// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { LucideUploadCloud, LucideTrash, ArrowRight } from "lucide-react";
// import Addlist_Input from "@/components/atoms/Addlist_Input";
// import TextInput from "@/components/atoms/TextInput";
// import AddSocial_Link_input from "@/components/atoms/AddSocial_Link_input";
// import { toast } from "react-toastify";
// import objectToFormData from "@/helpers/objectToFormData";

// import ReactPlayer from "react-player";

// function ToolInformation({ next, currentItem, isEdit }) {
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [toolUsers, setToolUsers] = useState([]);
//   const [demoVideoLink, setDemoVideoLink] = useState("");
//   const [keyFeatures, setKeyFeatures] = useState([]);
//   const [socialLinks, setSocialLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isPremium, setIsPremium] = useState(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       if (user) {
//         const parsed = JSON.parse(user);
//         if (parsed.is_premium) {
//           setIsPremium(true);
//         } else {
//           setIsPremium(false);
//         }
//       }
//     }
//   }, []);

//   const toolname = useSelector(
//     (state) => state.toolReducer.basic_information.name
//   );

//   const imageRef = useRef();

//   const handleImageChange = async (event) => {
//     const files = Array.from(event.target.files);
//     if (images.length + files.length > 3) {
//       toast("You can only upload a maximum of 3 images.", { type: "error" });
//       return;
//     }
//     setImages((prevImages) => [...prevImages, ...files]);
//   };

//   const handleDescriptionChange = (e) => setDescription(e.target.value);
//   const handleDemoVideoLinkChange = (e) => setDemoVideoLink(e.target.value);

//   const handleDeleteImage = (index) => {
//     setImages((prevImages) => prevImages.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     // Validation
//     if (!description || toolUsers.length === 0 || keyFeatures.length === 0) {
//       toast("Please fill all fields before submitting.", { type: "warning" });
//       setLoading(false);
//       return;
//     }

//     const data = {
//       description: description,
//       agent: JSON.stringify(toolUsers),
//       features: JSON.stringify(keyFeatures),
//       video: demoVideoLink,
//       links: JSON.stringify(socialLinks),
//     };

//     const formData = objectToFormData(data);
//     images[0] && formData.append("image1", images[0]);
//     images[1] && formData.append("image2", images[1]);
//     images[2] && formData.append("image3", images[2]);

//     try {
//       const response = await instance.post("/geeks_tools/tool-info/", formData);
//       if (response) {
//         toast(response.data?.detail, { type: "success" });
//         next();
//       }
//     } catch (e) {
//       if (e?.response?.data) {
//         Object.entries(e?.response?.data).forEach(([key, value]) => {
//           toast(value[0], { type: "error" });
//         });
//       } else {
//         toast("Something went wrong", { type: "error" });
//       }
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     if (isEdit) {
//       const imageList = [
//         currentItem?.tool_info?.image1,
//         currentItem?.tool_info?.image2,
//         currentItem?.tool_info?.image3,
//       ];

//       setImages(imageList.filter((image) => image !== null));
//     }
//   }, []);

//   return (
//     <div className="mt-5">
//       {loading && (
//         <div className=" w-full flex flex-col left-0 justify-center items-center h-full z-[1000] bg-black/15 backdrop-blur-sm absolute top-0">
//           <div className="loader"></div>
//         </div>
//       )}
//       <G_TextArea
//         isRequired
//         max={"1000"}
//         inputClassName={"min-h-[200px]"}
//         title={`Provide more information about ${toolname}`}
//         placeholder="Write about your tool in detail"
//         field={{
//           onChange: handleDescriptionChange,
//           value: currentItem?.tool_info?.description || description,
//         }}
//       />

//       <div className="mt-5 lg:flex items-center justify-between w-full">
//         <div className="flex-1 flex lg:items-end gap-2 lg:gap-5 lg:flex-row flex-col">
//           <div
//             onClick={() => images.length < 3 && imageRef.current.click()}
//             className="glassmorphism group border flex-none border-glassBorder overflow-hidden relative flex flex-col justify-center items-center cursor-pointer lg:w-[4.5rem] lg:h-[4.5rem] w-20 h-20 rounded-md"
//           >
//             <LucideUploadCloud className="lg:w-8 w-6 h-6 text-[#ffffff8f] group-hover:scale-[1.1] absolute animdurat lg:h-8" />
//           </div>
//           <div>
//             <h3>Upload {toolname} in use images</h3>
//             <p className="text-sm text-gray-400 font-light">
//               Please upload in jpg or png format
//             </p>
//           </div>
//           <input
//             onChange={handleImageChange}
//             type="file"
//             accept="image/*"
//             ref={imageRef}
//             className="hidden"
//           />
//         </div>
//         <div className="grid mt-4 lg:mt-0 grid-cols-3 gap-2 flex-1">
//           {images.map((image, index) => (
//             <div
//               key={index}
//               className="relative w-full bg-glassBorder rounded h-32"
//             >
//               <img
//                 src={
//                   image instanceof File
//                     ? URL.createObjectURL(image)
//                     : `${process.env.NEXT_PUBLIC_API_BASE_URL}${image}`
//                 }
//                 className="w-full h-full object-cover"
//                 alt={`Uploaded ${index}`}
//               />
//               <button
//                 onClick={() => handleDeleteImage(index)}
//                 className="absolute top-0 right-0 p-1 text-white bg-black bg-opacity-50 rounded-full"
//               >
//                 <LucideTrash className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className=" items-start gap-4">
//         <Addlist_Input
//           isRequired
//           list={toolUsers}
//           setList={setToolUsers}
//           title={`Who can use ${toolname}`}
//           className={"mt-5 flex-1"}
//           onChange={setToolUsers}
//         />

//         <div>
//           <TextInput
//             title="Software Demo video link"
//             className="flex-1"
//             field={{
//               onChange: handleDemoVideoLinkChange,
//               value: demoVideoLink,
//             }}
//           />
//           {demoVideoLink && !ReactPlayer.canPlay(demoVideoLink) && (
//             <p className="text-red-500 text-sm mt-1">
//               Please enter a valid video URL.
//             </p>
//           )}
//           {demoVideoLink && ReactPlayer.canPlay(demoVideoLink) && (
//             <ReactPlayer width="100%" url={demoVideoLink} controls />
//           )}
//         </div>
//       </div>

//       <Addlist_Input
//         isRequired
//         title={"Key Features"}
//         className={"mt-5 flex-1"}
//         list={keyFeatures}
//         setList={setKeyFeatures}
//       />
//       {isPremium && (
//         <AddSocial_Link_input
//           title={"Social Links"}
//           list={socialLinks}
//           setList={setSocialLinks}
//         />
//       )}
//       <div className="mt-5 w-full flex flex-row justify-end items-center">
//         <Button className={"px-10 "} onClick={handleSubmit}>
//           Next
//           <ArrowRight />
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default ToolInformation;
