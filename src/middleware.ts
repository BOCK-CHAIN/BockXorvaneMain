import { type NextRequest, NextResponse } from "next/server";

import { fetchAuthSession } from "@aws-amplify/core/server";
import { getCurrentUser } from "@aws-amplify/auth/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });
  console.log("user",user);
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard) {
    if (!user)
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)"],
};
