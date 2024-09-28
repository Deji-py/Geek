"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/images/png/logo.png";
import TextInput from "@/components/atoms/TextInput";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { signup_schema } from "@/formSchemas/signup_schema";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import SigninWithGoogleButton from "@/components/molecules/shared/SigninWithGoogleButton";
import { supabaseClient } from "@/utils/supabase";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signup_schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      if (!acceptedPolicy) {
        toast("Please accept our terms and privacy policy", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          type: "info",
        });
      } else {
        const { user, error } = await supabaseClient.auth.signUp({
          email: data.email.trim(),
          password: data.password.trim(),
          options: {
            data: {
              first_name: data.firstname.trim(),
              last_name: data.lastname.trim(),
            },
          },
        });

        if (error) {
          toast(error.message || "Unable to create an account", {
            type: "error",
          });
        } else {
          toast("Account created Successfully! 🎉", {
            type: "success",
          });

          router.replace(`/verifyOTP?email=${data.email.trim()}`);
        }
      }
    } catch (error) {
      toast("Unable to create an account", {
        type: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full py-5 lg:p-5 lg:py-0  lg:px-0  flex flex-col justify-center items-center">
      <a href="/">
        <Image
          src={logo}
          alt="Logo"
          className="xl:w-44  lg:absolute top-10 left-10  w-32 "
        />
      </a>
      <div className="  w-full mt-5 xl:w-[800px] lg:max-w-[65%] p-4 rounded-xl">
        <div>
          <h3 className=" text-xl lg:text-3xl  font-semibold">
            Create an account
          </h3>
          <p className=" text-gray-400 mb-8  text-base">
            Fill the form below to setup your account
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" grid gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <>
                        <TextInput
                          field={field}
                          isRequired
                          title={"First Name"}
                          type={"text"}
                        />
                        <FormMessage className="text-xs" />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <>
                        <TextInput
                          field={field}
                          isRequired
                          title={"Last Name"}
                          type={"text"}
                        />
                        <FormMessage className="text-xs" />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <>
                      <TextInput
                        field={field}
                        isRequired
                        title={"Email Address"}
                        type={"email"}
                        placeholder={"example@gmail.com"}
                      />
                      <FormMessage className="text-xs" />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className=" grid gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <>
                        <TextInput
                          field={field}
                          isRequired
                          title={"Password"}
                          type={"password"}
                        />
                        <FormMessage className="text-xs" />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <>
                        <TextInput
                          field={field}
                          isRequired
                          title={"Confirm password"}
                          type={"password"}
                        />
                        <FormMessage className="text-xs" />
                      </>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className=" relative mt-10 flex flex-col justify-center items-center">
              {loading && <div className=" z-10 loader absolute  " />}
              <Button
                disabled={loading ? true : false}
                type="submit"
                className="w-full primary_btn  relative gap-5 font-normal text-md lg:text-lg"
              >
                {" "}
                Sign up with Email
              </Button>
            </div>
          </form>
        </Form>
        <SigninWithGoogleButton />
        <div className="w-full flex flex-col mt-10 justify-center items-center">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              onCheckedChange={() => setAcceptedPolicy(!acceptedPolicy)}
              checked={acceptedPolicy}
            />
            <label
              htmlFor="terms"
              className="lg:text-sm text-xs text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept <span className="underline">Terms of Service </span> and{" "}
              <span className="underline"> Privacy Policy</span>
            </label>
          </div>
        </div>
        <div className=" w-full   text-center mt-8 flex flex-col justify-center ">
          <p className=" text-base font-light">
            Already have an account?{" "}
            <a href="/login">
              <span className=" cursor-pointer font-semibold hover:underline text-primary">
                Login
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
