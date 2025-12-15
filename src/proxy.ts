import { verifyToken } from "@/lib/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("Proxy triggered for path:", pathname);

  // Allow Next.js internal files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;
  const user = token ? await verifyToken(token) : null;

  console.log("Token:", token);
  console.log("User from token:", user);

  const publicPaths = ["/login", "/register"]; // public pages anyone can access
  const protectedPrefix = "/dashboard"; // only these routes require login

  // Redirect logged-in users away from login/register
  if (user && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect non-logged-in users trying to access protected routes
  if (
    !user &&
    (pathname === protectedPrefix || pathname.startsWith(`${protectedPrefix}/`))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise, allow access
  return NextResponse.next();
}
