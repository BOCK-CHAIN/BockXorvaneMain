"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader } from "@/components/ui/loader";
import { handleAuthError } from "@/hooks/errors";
import { confirmResetPassword, resetPassword, signIn } from "@aws-amplify/auth";
import { useAuthuser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  forgotPasswordCreateSchema,
  forgotPasswordResetSchema,
  ForgotPasswordCreateFormData,
  ForgotPasswordResetFormData,
} from "@/schemas/auth.schema";
import { passwordRequirements } from "@/constants/forms";
import { Check, X } from "lucide-react";

const ForgotPasswordPage = () => {
  const [step, setStep] = React.useState<"create" | "reset">("create");
  const router = useRouter();
  const { authUser } = useAuthuser();
  const [isFocused, setIsFocused] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const isResetStep = step === "reset";

  useEffect(() => {
    if (authUser) router.push("/dashboard");
  }, [authUser, router]);

  const form = useForm<ForgotPasswordCreateFormData | ForgotPasswordResetFormData>({
    resolver: zodResolver(isResetStep ? forgotPasswordResetSchema : forgotPasswordCreateSchema),
    defaultValues: { email: "", code: "", password: "" },
  });

  const onSubmit = async (values: ForgotPasswordCreateFormData | ForgotPasswordResetFormData) => {
    try {
      if (isResetStep) {
        const { email, code, password } = values as ForgotPasswordResetFormData;
        await confirmResetPassword({ username: email, newPassword: password, confirmationCode: code });
        await signIn({ username: email, password });
        toast.success("Password reset successfully");
        router.push("/dashboard");
      } else {
        const { email } = values as ForgotPasswordCreateFormData;
        await resetPassword({ username: email });
        toast.success("Reset code sent to your email");
        setStep("reset");
      }
    } catch (error) {
      handleAuthError(error as Error, router);
    }
  };

  const handleResendCode = async (email: string) => {
    try {
      await resetPassword({ username: email });
      toast.success("Code resent successfully");
    } catch (error) {
      handleAuthError(error as Error, router);
    }
  };

  return (
    <div className="flex-1 pt-24 md:px-16 w-full h-screen">
      < div className="flex flex-col h-full gap-3">
        <h2 className="text-gray-400 md:text-4xl font-bold">
          {isResetStep ? "Reset Password" : "Forgot Password?"}
        </h2>
        <p className="text-gray-500 md:text-sm">
          {isResetStep
            ? "Enter the code sent to your email along with your new password."
            : "You will receive a reset code in your email."}
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Loader loading={form.formState.isSubmitting}>
              <FormField
                control={form.control}
                name="email"
                disabled={isResetStep}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="bg-black" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isResetStep && (
                <>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-black" placeholder="Enter the reset code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="bg-black"
                            placeholder="Enter a new password"
                            {...field}
                            type="password"
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                              setIsFocused(false);
                              setIsBlurred(true);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                        {isFocused && (
                          <ul className="mt-2 space-y-1 transition-opacity duration-200">
                            {passwordRequirements.map((requirement) => {
                              const isMet = requirement.test(form.watch("password") || "");
                              return (
                                <li
                                  key={requirement.id}
                                  className={`flex items-center text-sm ${isMet ? "text-green-400" : isBlurred ? "text-red-500" : "text-gray-400"
                                    }`}
                                >
                                  {isMet ? (
                                    <Check className="w-4 h-4 mr-2 flex-shrink-0" />
                                  ) : (
                                    <X className="w-4 h-4 mr-2 flex-shrink-0" />
                                  )}
                                  <span>{requirement.label}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </FormItem>
                    )}
                  />
                </>
              )}
            </Loader>
            <Button type="submit" className="w-full">
              {isResetStep ? "Reset Password" : "Send Reset Code"}
            </Button>
          </form>
        </Form>
        {isResetStep && (
          <Button
            variant="ghost"
            size="lg"
            onClick={() => handleResendCode(form.getValues("email"))}
            className="hover:bg-transparent px-1 text-base hover:text-gray-300 font-bold text-gray-400"
          >
            Resend Code
          </Button>
        )}
        <p className="text-gray-500">
          {isResetStep ? (
            <>
              Remembered your password?{" "}
              <Link href="/auth/sign-in" className="font-bold text-gray-400">
                Sign In
              </Link>
            </>
          ) : (
            <>
              Know your password?{" "}
              <Link href="/auth/sign-in" className="font-bold text-gray-400">
                Sign In
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
