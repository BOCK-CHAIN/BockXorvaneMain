"use client";
import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import { handleAuthError } from "@/hooks/errors";
import {  confirmResetPassword, resetPassword, signIn } from "@aws-amplify/auth";
import useAuthuser from "@/hooks/use-auth-user";
import { toast } from "sonner";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const [currentUser, setUser] = useState<Record<string, any>>();
  const user = useAuthuser()
  useEffect(() => {
    if (user) setUser(user)
  }, [user])

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    try {
      await resetPassword({ username: email })
      toast.success("Reset code sent to your email")
      setSuccessfulCreation(true);
    } catch (err) {
      handleAuthError(err as Error, router);
    }
    setLoading(false);
  }

  const handleResendCode = async (email: string) => {
    try {
      setLoading(true)
      await resetPassword({
        username: email,
      });
      toast.success("Code sent successfully", { duration: 3000 });
      setLoading(false)
    } catch (error) {
      handleAuthError(error as Error, router)
      setLoading(false)
    }
  };

  async function reset(e: React.FormEvent) {
    e.preventDefault();
    if (!code) {
      setError("Code is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }
    setLoading(true);
    try {
      await confirmResetPassword({
        username: email,
        newPassword: password,
        confirmationCode: code,
      })
      await signIn({
        username: email,
        password: password,
      })
      toast.success("Password changed successful")
      router.push('/dashboard')
    } catch (err: any) {
      handleAuthError(err as Error, router);
    } finally {
      setLoading(false);
    }
  }

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
              Forgot Password?
            </h2>
            <p className="text-gray-500 md:text-sm">
              You will receive a mail to reset code
            </p>
            <form
              onSubmit={!successfulCreation ? create : reset}
              className="h-full"
            >
              <div className="flex flex-col justify-between gap-3 h-full">
                <Loader loading={loading}>
                  {!successfulCreation && (
                    <>
                      <Label
                        className="flex flex-col gap-2 text-white "
                        htmlFor={`email`}
                      >
                        <Input
                          id={`email`}
                          type="email"
                          className="bg-black"
                          onChange={(e) => {
                            setError("");
                            setEmail(e.target.value);
                          }}
                          placeholder={"Enter your email"}
                        />
                      </Label>
                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}
                      <div className="w-full flex flex-col gap-3 items-center">
                        <Button
                          type="submit"
                          className="w-full bg-white hover:bg-gray-200 text-black"
                        >
                          Send Password Reset Code
                        </Button>
                      </div>
                    </>
                  )}
                  {successfulCreation && (
                    <>
                      <Label
                        className="flex flex-col gap-2 text-white "
                        htmlFor={`text`}
                      >
                        <Input
                          onChange={(e) => {
                            setError("");
                            setCode(e.target.value);
                          }}
                          id={`text`}
                          className="bg-black"
                          placeholder={
                            "Enter the reset code that was sent to your email"
                          }
                        />
                      </Label>
                      <Label
                        className="flex flex-col gap-2 text-white "
                        htmlFor={`password`}
                      >
                        <Input
                          onChange={(e) => {
                            setError("");
                            setPassword(e.target.value);
                          }}
                          min={8}
                          id={`password`}
                          type="password"
                          className="bg-black"
                          placeholder={"Enter your password"}
                        />
                      </Label>
                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}
                      <div className="w-full flex flex-col gap-3 items-center">
                        <Button
                          type="submit"
                          className="w-full bg-white hover:bg-gray-200 text-black"
                        >
                          Reset Password
                        </Button>
                      </div>
                    </>
                  )}
                </Loader>
                <p className="text-gray-500 ">

                  Didn&apos;t receive the code?
                  <Button size={"lg"} onClick={() => handleResendCode(email)} variant={'ghost'} className="hover:bg-transparent px-1 font-bold text-small text-gray-400">
                    Resend code
                  </Button>
                </p>
                <p className="text-gray-500">
                  Know the password?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="font-bold text-gray-400"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
    // <div

    //   style={{
    //     margin: "auto",
    //     maxWidth: "500px",
    //   }}
    // >
    //   <h1>Forgot Password?</h1>
    //   <form
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       gap: "1em",
    //     }}
    //     onSubmit={!successfulCreation ? create : reset}
    //   >
    //     {!successfulCreation && (
    //       <>
    //         <label htmlFor="email">Provide your email address</label>
    //         <input
    //           type="email"
    //           placeholder="e.g john@doe.com"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <button>Send password reset code</button>
    //         {error && <p>{error}</p>}
    //       </>
    //     )}

    //     {successfulCreation && (
    //       <>
    //         <label htmlFor="password">Enter your new password</label>
    //         <input
    //           type="password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />

    //         <label htmlFor="password">
    //           Enter the password reset code that was sent to your email
    //         </label>
    //         <input
    //           type="text"
    //           value={code}
    //           onChange={(e) => setCode(e.target.value)}
    //         />

    //         <button>Reset</button>
    //         {error && <p>{error}</p>}
    //       </>
    //     )}

    //     {secondFactor && (
    //       <p>2FA is required, but this UI does not handle that</p>
    //     )}
    //   </form>
    // </div>
  );
};

export default ForgotPasswordPage;
