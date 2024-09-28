// "use client";
// import { Button } from "@/components/ui/button";
// import { LucideUploadCloud } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";
// import { getCode, getData } from "country-list";
// import { useForm } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import fetchProfile from "@/utils/fetchProfile";
// import { usePathname } from "next/navigation";

// import { toast } from "react-toastify";
// import { ReloadIcon } from "@radix-ui/react-icons";
// import Image from "next/image";
// import { useDispatch } from "react-redux";
// import { updateUserState } from "@/redux/user/userSlice";
// import objectToFormData from "@/helpers/objectToFormData";
// import G_Dropdown from "@/components/atoms/G_Dropdown";
// import { Skeleton } from "primereact/skeleton";
// import TextInput from "@/components/atoms/TextInput";

// function Edit_Profile() {
//   const [countries, setCountries] = useState(getData());
//   const [country, setCountry] = useState({});
//   const [defaultData, setDefaultData] = useState(null);
//   const form = useForm();
//   const [role, setRole] = useState({});
//   const pathname = usePathname();
//   const [roles, setRoles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isError, setIsError] = useState(null);
//   const [updating, setUpdating] = useState(false);
//   const [logoUrl, setLogoUrl] = useState("");
//   const imageRef = useRef();
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();

//   const handleFetchProfile = async (user) => {
//     try {
//       const profile = await fetchProfile(user.user_id);

//       if (profile) {
//         if (typeof window !== "undefined") {
//           localStorage.setItem(
//             "currentUser",
//             JSON.stringify({
//               ...user,
//               email: profile.email,
//               full_name: profile?.first_name + " " + profile?.last_name,
//               profilepic: profile.profile_picture,
//             })
//           );
//         }
//         setDefaultData({ ...profile, country: profile.country || "" });
//         setRole(profile?.role);

//         profile?.profile_picture && setLogoUrl(`${profile?.profile_picture}`);

//         setCountry({
//           code: profile?.country ? getCode(profile?.country) : "",
//           name: profile?.country,
//         });
//         dispatch(
//           updateUserState({
//             ...user,
//             email: profile.email,
//             full_name: profile?.first_name + " " + profile?.last_name,
//             profilepic: profile.profile_picture,
//           })
//         );
//       }
//     } catch (error) {
//       throw error; // Rethrow the error to be caught by the caller
//     }
//   };

//   const handleFetchRoles = async () => {
//     try {
//       const roles = await instance.get("/role_list/");
//       if (roles) {
//         setRoles(roles.data);
//       }
//     } catch (error) {
//       throw error; // Rethrow the error to be caught by the caller
//     }
//   };

//   const handleSetProfile = async (parsed) => {
//     setLoading(true);
//     try {
//       await handleFetchProfile(parsed);
//       await handleFetchRoles();
//       setIsError(false);
//     } catch (error) {
//       if (error.message.includes("Network Error")) {
//         toast("Check your internet connection", {
//           type: "error",
//         });
//       } else {
//         toast("Something went wrong", {
//           type: "error",
//         });
//       }
//       setIsError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getProfileInfo = () => {
//     if (typeof window !== "undefined") {
//       const user = localStorage.getItem("currentUser");
//       const parsed = JSON.parse(user);

//       if (user) {
//         handleSetProfile(parsed);
//       }
//     }
//   };

//   useEffect(() => {
//     getProfileInfo();
//   }, [pathname]);

//   useEffect(() => {
//     if (defaultData) {
//       form.reset({
//         firstname: defaultData.first_name || "",
//         lastname: defaultData.last_name || "",
//         email: defaultData.email || "",
//         companyName: defaultData.company || "",
//       });
//     }
//   }, [defaultData, form]);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const url = URL.createObjectURL(file);
//       setLogoUrl(url);
//       setFile(file);
//     }
//   };

//   const onSubmit = async (data) => {
//     if (typeof window !== "undefined") {
//       const user =
//         typeof window !== "undefined" && localStorage.getItem("currentUser");
//       const parsed = JSON.parse(user);

//       const updatedData = {
//         first_name: data.firstname,
//         last_name: data.lastname,
//         email: data.email,
//         company: data.companyName,
//         role: JSON.stringify(role),
//         country: country.name,
//       };
//       const formData = objectToFormData(updatedData);
//       file && formData.append("profile_picture", file);

//       try {
//         const response = await instance.put(
//           `/user_profile/${parsed.user_id}/`,
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         if (response) {
//           toast("Profile Updated Successfully", {
//             type: "success",
//           });
//         }
//       } catch (e) {
//         toast("Error: Profile Not Updated!", {
//           type: "error",
//         });
//       } finally {
//         setUpdating(false);
//         getProfileInfo();
//       }
//     }
//   };

//   if (loading) {
//     return (
//       <div className=" w-full h-[80vh] lg:h-screen flex flex-col justify-start px-3 items-center">
//         <div className="bg-secondary border border-glassBorder mt-5 lg:mt-10 w-full max-w-[50rem] p-5 rounded-md">
//           <div className=" flex  lg:gap-4 lg:items-end lg:flex-row flex-col">
//             <Skeleton
//               className="bg-[#101218] w-20 h-20 "
//               borderRadius="10px"
//               width="70px"
//               height="70px"
//             />
//             <div>
//               <Skeleton
//                 className="bg-[#101218] mt-5 "
//                 borderRadius="10px"
//                 width="100px"
//               />
//               <Skeleton
//                 className="bg-[#101218] mt-2 "
//                 borderRadius="10px"
//                 width="200px"
//               />
//             </div>
//           </div>
//           <Skeleton
//             className="bg-[#101218] mt-5 "
//             borderRadius="10px"
//             width="100%"
//             height="40px"
//           />
//         </div>
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
//           onClick={getProfileInfo}
//         >
//           Retry
//           <ReloadIcon className=" ml-2 " />
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <section className="w-full px-3 lg:pb-0  lg:px-0 flex h-full flex-1 justify-center items-center">
//       <div className="w-full max-w-7xl flex flex-col justify-start items-center h-full">
//         <div className="bg-secondary border border-glassBorder mt-3 lg:mt-8 w-full max-w-[50rem] p-4 lg:p-5 rounded-md">
//           <div className="w-full flex lg:items-end gap-2 lg:gap-5 lg:flex-row flex-col">
//             <div
//               onClick={() => imageRef.current.click()}
//               className="glassmorphism group border border-glassBorder overflow-hidden relative flex flex-col justify-center items-center cursor-pointer w-[4.5rem] h-[4.5rem]  !rounded-lg"
//             >
//               <LucideUploadCloud className="lg:w-8 w-6 h-6 text-[#ffffff8f] group-hover:scale-[1.1] absolute animdurat lg:h-8" />
//               {logoUrl && (
//                 <Image
//                   alt="profile picture"
//                   height={300}
//                   width={300}
//                   src={logoUrl}
//                   className="w-full h-full object-cover"
//                 />
//               )}
//             </div>
//             <div>
//               <h3>Upload Profile Image</h3>
//               <p className="text-sm text-gray-400 font-light">
//                 Please upload a square image in jpg or png format
//               </p>
//             </div>
//             <input
//               onChange={handleImageChange}
//               type="file"
//               accept="image/*"
//               ref={imageRef}
//               className="hidden"
//             />
//           </div>
//           {/* form */}
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="mt-3 flex flex-col"
//             >
//               <div className="flex w-full lg:gap-4 flex-col lg:flex-row lg:items-center">
//                 <FormField
//                   control={form.control}
//                   name="firstname"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormControl>
//                         <TextInput
//                           disabled
//                           field={field}
//                           title={"Firstname"}
//                           className={"flex-1"}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="lastname"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormControl>
//                         <TextInput
//                           disabled
//                           field={field}
//                           title={"Lastname"}
//                           className={"flex-1"}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="flex w-full lg:gap-4 flex-col lg:flex-row lg:items-center">
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormControl>
//                         <TextInput
//                           disabled
//                           field={field}
//                           title={"Email Address"}
//                           className={"flex-1"}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={form.control}
//                   name="companyName"
//                   render={({ field }) => (
//                     <FormItem className="flex-1">
//                       <FormControl>
//                         <TextInput
//                           field={field}
//                           title={"Company name"}
//                           className={"flex-1"}
//                         />
//                       </FormControl>
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className="flex w-full lg:gap-4 flex-col lg:flex-row lg:items-center">
//                 <G_Dropdown
//                   items={roles}
//                   selected={role}
//                   setSelected={setRole}
//                   title={"Your Role"}
//                   className={"flex-1"}
//                 />

//                 <G_Dropdown
//                   isFilter
//                   isCountry
//                   selected={country}
//                   setSelected={setCountry}
//                   items={countries}
//                   title={"Your Country"}
//                   className={"flex-1"}
//                 />
//               </div>
//               <div className=" mt-5 relative self-end w-fit flex flex-col justify-center items-center">
//                 {updating && <div className=" z-10 loader absolute  " />}
//                 <Button
//                   onClick={() => setUpdating(true)}
//                   className={
//                     "self-end  font-normal text-md !border border-transparent  primary_btn "
//                   }
//                 >
//                   Update profile
//                 </Button>
//               </div>
//             </form>
//           </Form>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Edit_Profile;
