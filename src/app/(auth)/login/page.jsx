"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../../../public/images/png/logo.png";
import TextInput from "@/components/atoms/TextInput";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login_schema } from "@/formSchemas/login_schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInUser, updateUserState } from "@/redux/user/userSlice";
import SigninWithGoogleButton from "@/components/molecules/shared/SigninWithGoogleButton";
import { supabaseClient } from "@/utils/supabase";

function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(login_schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { user, error } = await supabaseClient.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        throw error;
      }

      if (user) {
        // Fetch additional user profile data if necessary
        const { data: profileData, error: profileError } = await supabaseClient
          .from("profiles") // Replace with your profiles table name
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        dispatch(
          signInUser({
            access: user.access_token, // You can access the token if needed
            email: profileData.email,
            profilepic: profileData.profile_picture,
          })
        );
        dispatch(updateUserState(profileData));

        toast("Logged in Successfully", {
          type: "success",
        });
        router.replace("/dashboard/my-tools");
      }
    } catch (e) {
      const errorMessage = e.message || "Network error! Please try again";
      toast(errorMessage, {
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-5 lg:py-0  lg:px-0 flex h-full flex-col justify-center items-center">
      <a href="/">
        <Image
          src={logo}
          alt="Logo"
          className="xl:w-44  lg:absolute top-10 left-10  w-32"
        />
      </a>

      <div className="bg-secondary w-full mt-5 xl:w-[800px] lg:max-w-[60%] p-4 lg:p-5 rounded-xl">
        <div>
          <h3 className="text-xl lg:text-3xl font-semibold">Welcome Back,</h3>
          <p className="text-gray-400 mb-8 text-base">Login to your account</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                        title="Email Address"
                        type="email"
                        placeholder="example@gmail.com"
                      />
                      <FormMessage className="text-xs" />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
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
                        title="Password"
                        type="password"
                      />
                      <FormMessage className="text-xs" />
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="w-full mt-2 flex justify-end">
              <a
                className="text-base hover:underline text-gray-400"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
            </div>
            <div className="relative mt-10 flex flex-col justify-center items-center">
              {loading && <div className="z-10 loader absolute" />}
              <Button
                disabled={loading}
                type="submit"
                className="w-full primary_btn !h-11 relative gap-5 font-league text-md lg:text-lg"
              >
                Sign in with Email
              </Button>
            </div>
          </form>
        </Form>
        <SigninWithGoogleButton />
        <div className="w-full text-center mt-8 flex flex-col justify-center">
          <p className="text-base font-light">
            Dont have an account?{" "}
            <a href="/signup">
              <span className="cursor-pointer font-semibold hover:underline text-primary">
                Signup
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
