"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import { handleAuthError } from "@/hooks/errors";
import { autoSignIn, confirmResetPassword, confirmSignUp, resendSignUpCode, resetPassword, signIn } from "@aws-amplify/auth";
import useAuthuser from "@/hooks/use-auth-user";
import { toast } from "sonner";
import OTPInput from "@/components/_components/otp";

const ConfirmCode: NextPage = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const user = useAuthuser()
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [currentUser, setUser] = useState<Record<string, any>>();
  console.log(searchParams)
  useEffect(() => {
    const emailFromParams = searchParams.get("email");  // Retrieve email from search params
    console.log(email)
    if (emailFromParams) {
      setEmail(emailFromParams);
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  const confirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    try {
      const { isSignUpComplete, nextStep } = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      
      setLoading(false)
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
      handleAuthError(err as Error, router);
    }
    setLoading(false);
  }
  const handleResendCode = async (email: string) => {
    try {
      setLoading(true)
      await resendSignUpCode({
        username: email,
      });
      toast.success("Code sent successfully", { duration: 3000 });
      setLoading(false)
    } catch (error: any) {
      handleAuthError(error, router)
      setLoading(false)
    }
  };

  if (currentUser) {
    router.push('/dashboard')
    return null
  }

  return (
    <>
      <div className="flex-1 py-36 md:px-16 w-full">
        <div className="flex flex-col h-full gap-3">
          <div className="flex flex-col gap-3">
            <h2 className="text-gray-400 md:text-4xl font-bold">
              Confirm Code
            </h2>
            <p className="text-gray-500 md:text-sm">
              You will receive a mail to reset code
            </p>
            <form
              onSubmit={confirm}
              className="h-full"
            >
              <div className="flex flex-col justify-between gap-3 h-full">
                <Loader loading={loading}>
                  <div className="w-full justify-center flex py-5 text-white">
                    <OTPInput otp={code} setOtp={setCode} />
                  </div>
                  <div className="w-full flex flex-col gap-3 items-center text-green-700">
                    <Button
                      type="submit"
                      className="w-full bg-white text-black hover:bg-gray-300"
                    >
                      Create an account
                    </Button>
                    <p className="text-gray-500 ">
                      Didn't receive the code?
                      <Button size={"sm"} onClick={() => handleResendCode(email)} variant={'ghost'} className="hover:bg-transparent font-bold text-small text-gray-400">
                        Resend code
                      </Button>
                    </p>
                  </div>
                </Loader>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmCode;
