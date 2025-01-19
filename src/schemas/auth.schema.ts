import { ZodType, z } from "zod";

export type UserSignUpProps = {
  email: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const UserSignUpSchema: ZodType<UserSignUpProps> = z
  .object({
    fullname: z
      .string()
      .min(4, { message: "your full name must be atleast 4 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      }),
    confirmPassword: z.string(),
    otp: z.string().min(6, { message: "You must enter a 6 digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "passwords do not match",
    path: ["confirmPassword"],
  });

export type UserLoginProps = {
  email: string;
  password: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
});
