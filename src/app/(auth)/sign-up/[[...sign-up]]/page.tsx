import {  SignUp } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";


type Props = {};

export default async function SignUpPage({}: Props) {
  const user =await currentUser();
  if(user) return <div>Already Signed In</div>
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp />
    </div>
  );
}