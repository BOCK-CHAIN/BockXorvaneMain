import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Import jwtVerify from jose
import { clerkMiddleware } from "@clerk/nextjs/server";

const AUTHORIZED_DOMAINS = [
  "localhost:3000",
  "sub-app1.com",
  "sub-app2.com",
  "sub-app3.com",
];

const COGNITO_JWKS_URL = `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("cognitoToken")?.value;
  console.log(token)
  const response = NextResponse.next();
  if (!token) {
    // return response;
    return NextResponse.redirect("http://localhost:3000");
  }

  try {
    const resp = await fetch(COGNITO_JWKS_URL);
    const { keys } = await resp.json();
    const signingKey = keys[0];

    const { payload } = await jwtVerify(token, signingKey);

    if (payload.sub) {
      response.headers.set("X-User-Id", payload.sub as string);
    }
    if (typeof payload !== "string" && payload?.email) {
      response.headers.set("X-User-Email", payload.email as string);
    }
    return response;
  } catch (err) {
    console.error("Token verification failed:", err);
    return NextResponse.redirect("https://localhost:3000/auth/sign-in");
  }
}

export const config = {
  matcher: [
    '/(api|trpc)(.*)',
  ],
};
