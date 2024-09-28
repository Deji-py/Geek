// import React, { useState, useRef, useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { AlertCircle, ArrowRight, LucideUploadCloud } from "lucide-react";
// import project_structure from "../json/project_structure.json";
// import G_TextArea from "@/components/atoms/G_TextArea";
// import TextInput from "@/components/atoms/TextInput";
// import { useDispatch } from "react-redux";
// import { updateBasicInformation } from "@/redux/tool/toolSlice";
// import { Button } from "@/components/ui/button";

// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { tool_basic_information_Schema } from "@/formSchemas/tool_basic_info_schema";
// import G_Dropdown from "@/components/atoms/G_Dropdown";
// import { toast } from "react-toastify";

// import objectToFormData from "@/helpers/objectToFormData";

// // Come back here

// function BasicInfoForm({ setIsFree, next, defaultItem, isEdit, isDraft }) {
//   const [SelectedPricingIndex, setSelectedPricingIndex] = useState(0);
//   const dispatch = useDispatch();
//   const [pricingStructure, setPricingStructure] = useState("Free");
//   const [tooltype, setToolType] = useState(null);
//   const [category, setCategory] = useState(null);

//   const [hashtag, setHashtag] = useState([]);
//   const [error, setError] = useState({});
//   const [logoError, setLogoError] = useState("");

//   const [logoUrl, setLogoUrl] = useState(
//     isDraft
//       ? ""
//       : defaultItem?.user_tool?.logo
//       ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${defaultItem?.user_tool?.logo}`
//       : ""
//   );
//   const [file, setFile] = useState(""); // State to store the URL of the uploaded image
//   const imageRef = useRef();
//   const [loading, setLoading] = useState(false);

//   // -------------------------

//   const [toolTypes, setToolTypes] = useState([]);
//   const [hashs, setHashs] = useState([]);
//   const [subs, setSubs] = useState([]);

//   const form = useForm({
//     resolver: zodResolver(tool_basic_information_Schema),
//     defaultValues: {
//       toolname: defaultItem?.user_tool?.name || "",
//       websiteUrl: defaultItem?.user_tool?.url || "",
//       oneliner: defaultItem?.user_tool?.intro || "",
//     },
//   });

//   const getIndexByValue = (value) => {
//     return project_structure.findIndex((item) => item.value === value);
//   };

//   useEffect(() => {
//     if (logoError) {
//       toast("Please Upload your tool logo", { type: "error" });
//     }
//   }, [logoError]);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     let newError = {};
//     if (!tooltype) {
//       newError.tooltype = "Tool type is required";
//     }
//     if (!category) {
//       newError.category = "Category is required";
//     }
//     if (hashtag.length === 0) {
//       newError.hashtag = "Add at least one Hashtag";
//     }
//     setError(newError);

//     if (logoUrl === "") {
//       setLogoError("Please add a tool logo");
//     } else {
//       setLogoError("");
//     }

//     if (Object.keys(newError).length === 0 && logoUrl !== "") {
//       const updatedData = {
//         name: data.toolname,
//         url: data.websiteUrl,
//         intro: data.oneliner,
//         pricing: pricingStructure,
//         logo: file,
//         category: JSON.stringify(tooltype),
//         hashtag: JSON.stringify(hashtag),
//         subcategory: JSON.stringify(category),
//       };

//       if (!isEdit) {
//         const formData = objectToFormData(updatedData);

//         try {
//           const result = await instance.post(
//             "/geeks_tools/user-tool/",
//             formData,
//             {
//               headers: {
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );

//           dispatch(updateBasicInformation(updatedData));
//           toast("Successfully Submitted Basic tool information", {
//             type: "success",
//           });
//           next();
//         } catch (e) {
//           if (e?.response?.data?.error) {
//             Object.entries(e?.response?.data?.error).forEach(([key, value]) => {
//               toast(value[0], { type: "error" });
//             });
//           } else {
//             toast("Something went wrong", { type: "error" });
//           }
//         }
//       } else {
//         dispatch(updateBasicInformation(updatedData));
//         next();
//       }
//     }
//     setLoading(false);
//   };

//   const handleChange = (name, value) => {
//     if (name === "tooltype") {
//       setToolType(value);
//     } else if (name === "category") {
//       setCategory(value);
//     } else if (name === "hashtag") {
//       setHashtag(value);
//     }

//     setError((prevError) => {
//       const { [name]: removedError, ...rest } = prevError;
//       return rest;
//     });
//   };

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setLogoUrl(url);
//       setFile(file);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await instance.get("/geeks_tools/category/");
//         const data = response.data;
//         const filteredData = data.map(({ image, ...rest }) => rest);
//         setToolTypes(filteredData);
//       } catch (e) {
//         setToolTypes([]);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       if (tooltype?.id) {
//         try {
//           const response = await instance.get(
//             `/geeks_tools/subcategories/${tooltype.id}/`
//           );
//           setSubs(response.data);
//         } catch (e) {
//           setSubs([]);
//         }
//       }
//     };

//     fetchSubCategories();
//   }, [tooltype]);

//   useEffect(() => {
//     const fetchHashTags = async () => {
//       if (category?.id) {
//         try {
//           const response = await instance.get(
//             `/geeks_tools/hashtags/${category.id}/`
//           );
//           setHashs(response.data);
//         } catch (e) {
//           setHashs([]);
//         }
//       }
//     };

//     fetchHashTags();
//   }, [category]);

//   useEffect(() => {
//     if (isEdit || isDraft) {
//       setToolType(defaultItem?.user_tool?.category);
//       setCategory(defaultItem?.user_tool?.subcategory);
//       setHashtag(defaultItem?.user_tool?.hashtag);
//     }
//   }, []);

//   return (
//     <Form {...form}>
//       {loading && (
//         <div className=" w-full flex flex-col left-0 justify-center items-center h-full z-[1000] bg-black/15 backdrop-blur-sm absolute top-0">
//           <div className="loader"></div>
//         </div>
//       )}
//       <form onSubmit={form.handleSubmit(onSubmit)}>
//         <div className="w-full flex lg:mt-0 lg:items-end gap-2 lg:gap-5  relative lg:flex-row flex-col">
//           <div
//             onClick={() => imageRef.current.click()}
//             className="   glassmorphism group border border-glassBorder overflow-hidden relative  flex flex-col justify-center items-center cursor-pointer lg:w-[4.5rem] lg:h-[4.5rem] w-20 h-20 rounded-md "
//           >
//             <LucideUploadCloud className="lg:w-8 w-6 h-6 text-[#ffffff8f] group-hover:scale-[1.1] absolute  animdurat lg:h-8" />
//             {logoUrl && (
//               <img src={logoUrl} className="w-full  h-full object-cover" />
//             )}
//           </div>
//           <div>
//             <h3>Upload tool logo</h3>
//             <p className=" text-sm text-gray-400 font-light">
//               Please upload a square image in jpg or png format
//             </p>
//             {logoError && (
//               <p className="text-red-500 text-xs mt-1">{logoError}</p>
//             )}
//           </div>
//           <input
//             onChange={handleImageChange}
//             type="file"
//             accept="image/*"
//             ref={imageRef}
//             className="hidden"
//           />
//         </div>
//         <div className="flex w-full lg:gap-4 flex-col lg:flex-row lg:items-center">
//           <FormField
//             control={form.control}
//             name="toolname"
//             render={({ field }) => (
//               <FormItem className="flex-1">
//                 <FormControl>
//                   <TextInput
//                     title="Tool Name"
//                     field={field}
//                     className="flex-1"
//                   />
//                 </FormControl>
//                 <FormMessage className="text-xs" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="websiteUrl"
//             render={({ field }) => (
//               <FormItem className="flex-1 relative">
//                 <FormControl>
//                   <TextInput
//                     title="Website URL"
//                     field={field}
//                     className="flex-1"
//                   />
//                 </FormControl>
//                 <FormMessage className="text-xs " />
//               </FormItem>
//             )}
//           />
//         </div>
//         <FormField
//           control={form.control}
//           name="oneliner"
//           render={({ field }) => (
//             <FormItem className="flex-1 relative">
//               <FormControl>
//                 <G_TextArea
//                   max={"70"}
//                   field={field}
//                   title="One line intro"
//                   placeholder="Write a short intro about your tool"
//                   className="flex-1"
//                 />
//               </FormControl>
//               <FormMessage className="text-xs" />
//             </FormItem>
//           )}
//         />
//         <div className="flex w-full lg:gap-4 flex-col lg:flex-row ">
//           <div className="flex-1">
//             <G_Dropdown
//               setSelected={(value) => handleChange("tooltype", value)}
//               selected={tooltype}
//               items={toolTypes}
//               placeholder={"Choose Tool Type"}
//               className={"flex-1"}
//               title={"Tool Type "}
//             />
//             {error.tooltype && (
//               <p className="text-red-500 text-xs mt-1">{error.tooltype}</p>
//             )}
//           </div>
//           <div className="flex-1">
//             <G_Dropdown
//               setSelected={(value) => handleChange("category", value)}
//               selected={category}
//               items={subs}
//               placeholder={"Choose Category"}
//               className={"flex-1"}
//               title={"Category"}
//             />
//             {error.category && (
//               <p className="text-red-500 text-xs mt-1">{error.category}</p>
//             )}
//           </div>
//         </div>
//         <div>
//           <G_Dropdown
//             setSelected={(value) => handleChange("hashtag", value)}
//             selected={hashtag}
//             items={hashs}
//             isMultiselect
//             placeholder={"Choose Hashtags"}
//             className={"flex-1"}
//             title={"Hashtags"}
//           />
//           {error.hashtag && (
//             <p className="text-red-500 text-xs mt-1">{error.hashtag}</p>
//           )}
//         </div>

//         <div className="my-5">
//           <label className="text-sm lg:text-base">Pricing Structure</label>
//           <RadioGroup
//             onValueChange={(value) => {
//               setSelectedPricingIndex(getIndexByValue(value));
//               setIsFree(value === "Free");
//               setPricingStructure(value);
//             }}
//             defaultValue={
//               defaultItem?.user_tool?.pricing || project_structure[0].value
//             }
//           >
//             <div className="flex items-center gap-3 mt-2">
//               {project_structure.map((item, index) => (
//                 <div key={index} className="flex items-center space-x-2">
//                   <RadioGroupItem value={item.value} id={item.value} />
//                   <label htmlFor={item.value}>{item.title}</label>
//                 </div>
//               ))}
//             </div>
//           </RadioGroup>
//         </div>

//         <Alert variant={project_structure[SelectedPricingIndex].value}>
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>
//             {project_structure[SelectedPricingIndex]?.messageTitle}
//           </AlertTitle>
//           <AlertDescription>
//             {project_structure[SelectedPricingIndex]?.message}
//           </AlertDescription>
//         </Alert>
//         <div className="mt-8 w-full flex flex-col justify-end items-end">
//           <Button
//             type="submit"
//             className="self-end !px-10  font-normal text-sm  lg:text-lg primary_btn"
//           >
//             Next
//             <ArrowRight size={18} />
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }

// export default BasicInfoForm;
