"use client";

import { authConfig } from "@/constants/authConfig";
import { Amplify, type ResourcesConfig } from "aws-amplify";

Amplify.configure(
  {
    Auth: authConfig,
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
