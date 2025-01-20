"use client";
import { AuthContextProvider } from "@/context/use-auth-context";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Loader } from "../../ui/loader";
import { useSignUpForm } from "@/hooks/auth/use-sign-up";

type Props = {
  children: React.ReactNode;
};

const SignUpFormProvider = ({ children }: Props) => {
  const { methods, onHandleSubmit, loading } = useSignUpForm();
  console.log("laoding",loading)
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className="h-full">
          <div className="flex flex-col justify-between gap-3 h-full">
            <Loader loading={loading}>{children}</Loader>
          </div>
        </form>
      </FormProvider>
    </AuthContextProvider>
  );
};

export default SignUpFormProvider;
