"use client";
import TextInput from "@/components/atoms/TextInput";
import forgotPass from "../../../../public/images/png/resetpass.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmitEmail = async () => {
    setLoading(true);
    if (email.trim() !== "") {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/password_reset/request/`,
          { email }
        );
        if (response) {
          toast("Password reset request sent successfully", {
            type: "success",
          });
          push(`/check-email?email=${email}`);
        }
      } catch (error) {
        if (error?.response?.data) {
          Object.entries(error?.response?.data).forEach(([key, value]) => {
            toast(value[0], { type: "error" });
          });
        } else {
          toast("Something went wrong", { type: "error" });
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full px-3 lg:px-0 h-full relative flex flex-col justify-center items-center ">
      <div className=" lg:h-[10rem]  w-[6rem] h-[6rem]  bg-gradient-to-r lg:w-[10rem] absolute mb-40 from-primary to-[#0AD9BE]  blur-3xl lg:blur-[100px]"></div>
      <Image
        src={forgotPass}
        className=" absolute mb-[250px] w-[15rem] "
        alt="logo"
      />
      <div className=" p-5 mt-40 relative z-[1000] border-glassBorder border rounded-xl  w-full max-w-[30rem] bg-secondary">
        <div>
          <h3 className=" text-xl lg:text-2xl  font-semibold">
            Forgot Password,
          </h3>
          <p className=" text-gray-400 mb-8  text-sm">
            Please enter your email address
          </p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <TextInput
            field={{
              onChange: (e) => setEmail(e.target.value),
              value: email,
            }}
            isRequired
            title={"Email Address"}
            type={"email"}
            value={email}
            placeholder={"example@gmail.com"}
          />

          <div className=" relative mt-5 flex flex-col justify-center items-center">
            {loading && <div className=" z-10 loader absolute  " />}
            <Button
              onClick={handleSubmitEmail}
              disabled={loading}
              className={"w-full primary_btn  font-normal text-md lg:text-lg"}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
