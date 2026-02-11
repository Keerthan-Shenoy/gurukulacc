import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define protected routes with regex patterns
const protectedPatterns = [
  /^\/dashboard(\/.*)?$/,
  /^\/quiz(\/.*)?$/,
  /^\/pro(\/.*)?$/, 
];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const path = req.nextUrl.pathname;

  // Check if the path matches any protected pattern
  const isProtected = protectedPatterns.some((pattern) => pattern.test(path));

  // Redirect if protected route and no token
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ["/dashboard/:path*", "/quiz/:path*", "/pro/:path*"],
};
