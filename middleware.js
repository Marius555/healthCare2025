import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function middleware(req) {
  const session = await cookies();
  const cookieStore = session.get("appSession") 
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/auth") && !cookieStore) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (cookieStore && ["/login", "/registration"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ["/auth/:path*", "/login", "/registration"],
};
