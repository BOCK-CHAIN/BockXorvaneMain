import { ZodType, z } from "zod";

export type UserSignUpProps = {
  email: string;
  fullname: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

const password = z
  .string()
  .min(8, { message: "Your password must be at least 8 characters long" })
  .max(64, {
    message: "Your password cannot be longer than 64 characters",
  })
  .regex(/[A-Z]/, {
    message: "Your password must contain an uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Your password must contain a lowercase letter",
  })
  .regex(/\d/, { message: "Your password must contain a number" })
  .regex(/[^a-zA-Z0-9]/, {
    message: "Your password must contain a symbol",
  });

export const UserSignUpSchema: ZodType<UserSignUpProps> = z
  .object({
    fullname: z
      .string()
      .min(4, { message: "Your full name must be at least 4 characters long" }),
    email: z.string().email({ message: "Incorrect email format" }),
    password: password,
    confirmPassword: z.string(),
    otp: z.string().length(6, { message: "You must enter a 6-digit code" }),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error is shown under confirmPassword
  });

export type UserLoginProps = {
  email: string;
  password: string;
  otp?: string;
};

export const UserLoginSchema: ZodType<UserLoginProps> = z.object({
  email: z.string().email({ message: "You did not enter a valid email" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 characters long" })
    .max(64, {
      message: "Your password can not be longer then 64 characters long",
    }),
  otp: z.string().length(6, { message: "You must enter a 6-digit code" }),
});

export const forgotPasswordCreateSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const forgotPasswordResetSchema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, { message: "The code must be 6 digits" }),
  password: password,
});

export const resetPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Your password must be atleast 8 characters long" })
      .max(64, {
        message: "Your password can not be longer then 64 characters long",
      }),
    newPassword: password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ForgotPasswordCreateFormData = z.infer<
  typeof forgotPasswordCreateSchema
>;
export type ForgotPasswordResetFormData = z.infer<
  typeof forgotPasswordResetSchema
>;
