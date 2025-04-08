import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./utils/amplify-server-utils";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAuth = request.nextUrl.pathname.startsWith("/auth");

  // return NextResponse.redirect(new URL("/", request.nextUrl));
  

  if (isOnAuth) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    } else {
      return response;
    }
  }

  if (isOnDashboard) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
    if (!user)
      return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl));
    return response;
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)"],
};

// import { type NextRequest, NextResponse } from "next/server";

// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/", request.nextUrl));
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
