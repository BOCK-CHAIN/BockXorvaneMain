"use client";
import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignUpForm } from "@/hooks/auth/use-sign-up";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

// type Props = {};

const ButtonHandler = () => {
  const { setCurrentStep, currentStep } = useAuthContextHook();
  const { getValues, trigger } = useFormContext();
  const { onGenerateOTP, handleResendCode } = useSignUpForm();

  if (currentStep === 2) {
    return (
      <div className="w-full flex flex-col gap-3 items-center text-green-700">
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-300"
        >
          Create an account
        </Button>
        <p className="text-gray-500 ">
          Didn't receive the code?
          <Button size={"lg"} onClick={() => handleResendCode(getValues("email"))} variant={'ghost'} className="hover:bg-transparent px-1 font-bold text-small text-gray-400">
            Resend code
          </Button>
        </p>
        <p className="text-gray-500 ">
          Already have an account?
          <Link href="/auth/sign-in" className="font-bold text-gray-400 hover:text-gray-300 px-1">
            Sign In
          </Link>
        </p>

      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 items-center text-green-700">
      <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-300"
        {...{
          onClick: async () => {
            const isValid = await trigger([
              "email",
              "fullname",
              "password",
              "confirmPassword",
            ]);
            console.log(isValid)
            if (isValid)
              onGenerateOTP(
                getValues("email"),
                getValues("password"),
                getValues("fullname"),
                setCurrentStep
              );
          },
        }}
      >
        Continue
      </Button>
      <p className="text-gray-500">
        Already have an account?{" "}
        <Link href="/auth/sign-in" className="font-bold text-gray-400">
          Sign In
        </Link>
      </p>
    </div>
  );

};

export default ButtonHandler;
