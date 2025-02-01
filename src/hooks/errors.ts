'use client'
import { toast } from "sonner";

export const handleAuthError = (error: Error, router: any) => {
  let errorMessage = error.message || "An error occurred. Please try again.";
  let action = null;
  console.log(error)
  switch (error.name) {
    case "PasswordResetRequiredException":
      errorMessage = "Password reset required. Press send to send the code.";
      action = {
        label: "Reset Password",
        onClick: () => { router.push("/auth/reset-password") },
      };
      break;
    case "UserNotConfirmedException":
      errorMessage = "Please verify your email. Press verify to send the code.";
      action = {
        label: "Verify Email",
        onClick: () => router.push("/auth/verify-email"),
      };
      break;
    case "ExpiredCodeException":
      errorMessage = "Confirmation code expired. Resend the code.";
      action = {
        label: "Resend Code",
        onClick: () => router.push("/auth/verify-email"),
      };
      break;
    case "UsernameExistsException":
      errorMessage = "User already exists. Please sign in.";
      action = {
        label: "Sign In",
        onClick: () => router.push("/auth/sign-in"),
      };
      break;
    default:
      errorMessage = error.message || "An error occurred. Please try again.";
  }

  return toast.error(errorMessage, { action });
};
