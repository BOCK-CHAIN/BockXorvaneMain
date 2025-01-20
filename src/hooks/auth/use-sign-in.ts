"use client";
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { confirmSignUp, resendSignUpCode, signIn } from "aws-amplify/auth";
import { handleAuthError } from "../errors";
import { toast } from "sonner";

export const useSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      if (!values.otp) {
        return toast.error("OTP is required", { duration: 3000 });
      }
      try {
        setLoading(true);
        await confirmSignUp({
          username: values.email,
          confirmationCode: values.otp as string,
        });
        await signIn({
          username: values.email,
          password: values.password,
        });
        router.push("/dashboard");
        setLoading(false);
      } catch (error: any) {
        const err = error as Error;
        handleAuthError(err, router);
        setLoading(false);
      }
    }
  );

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

  const onLogin = async (
    email: string,
    password: string,
    onNext: React.Dispatch<React.SetStateAction<number>>
  ) => {
    try {
      setLoading(true);
      const { nextStep } = await signIn({
        username: email,
        password: password,
      });
      if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
        await resendSignUpCode({
          username: email,
        });
        onNext((prev) => prev + 1);
        setLoading(false);
        toast.info(
          "Email not verified.Please check your mail and enter the code",
          { duration: 3000 }
        );
        return;
      }
      toast.success("Signed in successfully", { duration: 3000 });
      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      handleAuthError(error, router);
      setLoading(false);
    }
  };

  return {
    methods,
    onHandleSubmit,
    onLogin,
    handleResendCode,
    loading,
  };
};
