import {  SignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

export default async function Signin() {
  const user =await currentUser();
  if(user) return <div>Already Signed In</div>
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn />
    </div>
  );
}
