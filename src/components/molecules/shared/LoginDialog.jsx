import { Button } from "@/components/ui/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import SigninWithGoogleButton from "./SigninWithGoogleButton";

function LoginDialog({ loginDialogOpen, setLoginDialogOpen }) {
  return (
    <Dialog
      headerClassName="bg-secondary"
      contentClassName="bg-secondary "
      visible={loginDialogOpen}
      headerStyle={{ color: "white" }}
      className=" !text-white !z-[10000000]"
      onHide={() => {
        if (!loginDialogOpen) return;
        setLoginDialogOpen(false);
      }}
    >
      <div className="text-white">
        <h2 className=" lg:text-2xl text-xl font-bold font-league">
          Sign in to account
        </h2>
        <h3 className=" font-league text-slate-400">
          You have to be signed in to add tool to book mark
        </h3>
        <a href="/login">
          <Button
            // disabled={loading ? true : false}
            type="submit"
            className="w-full primary_btn font-league  relative gap-5 font-normal text-md mt-5 lg:text-lg"
          >
            Sign in with Email
          </Button>
        </a>
      </div>
      <SigninWithGoogleButton />
    </Dialog>
  );
}

export default LoginDialog;
