import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const authUser = req.cookies.get("authUser")?.value;
  const { pathname } = req.nextUrl;

  const isHomePage = pathname === "/";
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isPrivatePage = pathname.startsWith("/dashboard");

  if ((isAuthPage || isHomePage) && authUser) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (isPrivatePage && !authUser) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup", "/dashboard/:path*"],
};
