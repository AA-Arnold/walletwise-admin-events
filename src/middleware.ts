import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/validate-ticket",
  "/unauthorized",
  "/not-found",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("partnerToken")?.value;
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token) {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);

      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("partnerToken");
        return response;
      }
    } catch (error) {
      console.log("error", error);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("partnerToken");
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
