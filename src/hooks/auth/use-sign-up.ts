"use client";
import { UserSignUpProps, UserSignUpSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { confirmSignUp, resendSignUpCode, signUp } from "aws-amplify/auth";
// import { onCompleteUserRegistration } from "@/actions/auth";
import { useToast } from "../use-toast";
import { z } from "zod";

export const useSignUpForm = () => {
  const { toast } = useToast();
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
      console.log(email, password, name);
      setLoading(true);
      const { isSignUpComplete, userId, nextStep } = await signUp({
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
      console.log("hello", isSignUpComplete, userId, nextStep);
      setLoading(false);
      onNext((prev) => prev + 1);
    } catch (error: any) {
      console.log(error);
      console.log(error.errors[0].longMessage);
      toast({
        title: "Error",
        description: error.errors[0].longMessage,
        duration: 3000,
      });
    }
  };

  const handleResendCode = async (email: string) => {
    try {
      await resendSignUpCode({
        username: email,
      });
      toast({
        title: "Success",
        description: "Code resent successfully",
        duration: 3000,
      });
    } catch (err: any) {
      console.log(err.errors[0].longMessage);
      toast({
        title: "Error",
        description: err.errors[0].longMessage,
        duration: 3000,
      });
    }
  };

  const onHandleSubmit = methods.handleSubmit(
    async (values: UserSignUpProps) => {
      try {
        setLoading(true);
        const { isSignUpComplete, nextStep } = await confirmSignUp({
          username: values.email,
          confirmationCode: values.otp,
        });

        if (isSignUpComplete) {
          toast({
            title: "Success",
            description: "Sign up successful",
            duration: 3000,
          });
          setLoading(true);
          router.push("/dashboard");
        }
        router.push("/auth/sign-in");
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.errors[0].longMessage,
        });
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
