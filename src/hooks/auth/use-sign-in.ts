"use client";
// import { useToast } from '@/components/ui/use-toast'
import { UserLoginProps, UserLoginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "../use-toast";
import { resendSignUpCode, signIn } from "aws-amplify/auth";

export const useSignInForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();
  const methods = useForm<UserLoginProps>({
    resolver: zodResolver(UserLoginSchema),
    mode: "onChange",
  });
  const onHandleSubmit = methods.handleSubmit(
    async (values: UserLoginProps) => {
      try {
        setLoading(true);
        console.log(values);
        const { isSignedIn, nextStep } = await signIn({
          username: values.email,
          password: values.password,
        });
        console.log("HELLO", isSignedIn);
        if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
          await resendSignUpCode({
            username: values.email,
          });
          toast({
            title: "Success",
            description: "Please confirm your email",
            duration: 3000,
          });
          router.push("/auth/confirm-code");
        }
        toast({
          title: "Success",
          description: "Successfully signed in",
          duration: 3000,
        });
        router.push("/dashboard");
      } catch (error: any) {
        setLoading(false);
        console.log(error);
      }
    }
  );

  return {
    methods,
    onHandleSubmit,
    loading,
  };
};
