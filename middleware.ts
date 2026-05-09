import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const USER_LOGIN_PATH = "/auth/login";
const USER_DEFAULT_PATH = "/mini-app/dashboard";
const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DEFAULT_PATH = "/admin/dashboard";

function isMiniAppRoute(pathname: string) {
  return pathname.startsWith("/mini-app");
}

function isAdminProtectedRoute(pathname: string) {
  return pathname.startsWith("/admin") && pathname !== ADMIN_LOGIN_PATH;
}

function buildLoginRedirect(req: NextRequest, loginPath: string) {
  const loginUrl = new URL(loginPath, req.url);
  loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token && isMiniAppRoute(pathname)) {
    return buildLoginRedirect(req, USER_LOGIN_PATH);
  }

  if (!token && isAdminProtectedRoute(pathname)) {
    return buildLoginRedirect(req, ADMIN_LOGIN_PATH);
  }

  if (token && pathname === USER_LOGIN_PATH) {
    return NextResponse.redirect(new URL(USER_DEFAULT_PATH, req.url));
  }

  if (token && pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.redirect(new URL(ADMIN_DEFAULT_PATH, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mini-app/:path*", "/admin/:path*", "/auth/login", "/admin/login"],
};
