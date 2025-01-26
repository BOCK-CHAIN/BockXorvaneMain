"use client";
import { UserSignUpProps, UserSignUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  autoSignIn,
  confirmSignUp,
  resendSignUpCode,
  signUp,
} from "aws-amplify/auth";
import { z } from "zod";
import { toast } from "sonner";
import { handleAuthError } from "../errors";
import { onCompleteSignupPending, onCompleteUserSignUp } from "@/actions/auth";

export const useSignUpForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<z.infer<typeof UserSignUpSchema>>({
    resolver: zodResolver(UserSignUpSchema),
    mode: "onChange",
  });

  const onGenerateOTP = async (
    email: string,
    password: string,
    name: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    try {
      setLoading(true);
      await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
            name: name,
          },
          autoSignIn: true,
        },
      });
      await onCompleteSignupPending(email, name);
      setLoading(false);
      toast.success("Code sent successfully to your email", { duration: 3000 });
      onNext((prev) => prev + 1);
    } catch (error) {
      const err = error as Error;
      handleAuthError(err, router);
      setLoading(false);
    }
  };

  const handleResendCode = async (email: string) => {
    try {
      setLoading(true);
      await resendSignUpCode({
        username: email,
      });

      toast.success("Code sent successfully", { duration: 3000 });
      setLoading(false);
    } catch (error: any) {
      handleAuthError(error, router);
      setLoading(false);
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserSignUpProps) => {
      try {
        setLoading(true);
        await confirmSignUp({
          username: values.email,
          confirmationCode: values.otp,
        });
        const sign = await onCompleteUserSignUp(values.email);
        if (sign?.status === 400) {
          throw new Error(sign.message);
        }
        await autoSignIn();
        toast.success("Sign up successful", { duration: 3000 });
        router.push("/dashboard");
        setLoading(false);
      } catch (error: any) {
        const err = error as Error;
        handleAuthError(err, router);
        setLoading(false);
      }
    }
  );
  return {
    methods,
    onHandleSubmit,
    handleResendCode,
    onGenerateOTP,
    loading,
  };
};
