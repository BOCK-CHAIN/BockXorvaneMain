"use client";
import { Button } from "@/components/ui/button";
import { useAuthContextHook } from "@/context/use-auth-context";
import { useSignInForm } from "@/hooks/auth/use-sign-in";
import Link from "next/link";
import React from "react";
import { useFormContext } from "react-hook-form";

// type Props = {};

const ButtonHandler = () => {
    const { setCurrentStep, currentStep } = useAuthContextHook();
    const { getValues, trigger } = useFormContext();
    const { onLogin, handleResendCode } = useSignInForm();

    if (currentStep === 2) {
        return (
            <div className="w-full flex flex-col gap-3 items-center text-green-700">
                <Button
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-300"
                >
                    Submit
                </Button>
                <p className="text-gray-500 ">
                    Didn't receive the code?
                    <Button size={"lg"} onClick={() => handleResendCode(getValues("email"))} variant={'ghost'} className="hover:bg-transparent px-1 font-bold text-small text-gray-400">
                        Resend code
                    </Button>
                </p>
                <p className="text-gray-500 ">
                    Don't have an account?
                    <Link href="/auth/sign-up" className="font-bold text-gray-400 px-1 hover:text-gray-300">
                        Sign Up
                    </Link>
                </p>

            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-3 items-center text-green-700">
            <Button
                className="w-full bg-white text-black hover:bg-gray-300"
                {...{
                    onClick: async () => {

                        const isValid = await trigger([
                            "email",
                            "password"
                        ]);
                        if (isValid)
                            onLogin(
                                getValues("email"),
                                getValues("password"),
                                setCurrentStep
                            );
                    },
                }}
            >
                Submit
            </Button>
            <p className="text-gray-500">
                Forgot Password?{" "}
                <Link
                    href="/auth/reset-password"
                    className="font-bold text-gray-400"
                >
                    Click here
                </Link>
            </p>
            <p className="text-gray-500">
                Don't have an account?
                <Link href="/auth/sign-up" className="font-bold text-gray-400">
                    Sign Up
                </Link>
            </p>
        </div>
    );

};

export default ButtonHandler;
