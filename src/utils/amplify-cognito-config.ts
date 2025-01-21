"use client";

import { authConfig } from "@/constants/authConfig";
import { Amplify } from "aws-amplify";

Amplify.configure(
  {
    Auth: authConfig,
    
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
