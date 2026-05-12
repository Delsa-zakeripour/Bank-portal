import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const USER_LOGIN_PATH = "/auth/login";
const USER_DEFAULT_PATH = "/mini-app/dashboard";
const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_DEFAULT_PATH = "/admin/dashboard";

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (routing.locales.includes(maybeLocale as "en" | "fa")) {
    const pathWithoutLocale = `/${segments.slice(2).join("/")}`;
    return {
      locale: maybeLocale,
      pathname: pathWithoutLocale === "/" ? "/" : pathWithoutLocale,
    };
  }

  return {
    locale: routing.defaultLocale,
    pathname,
  };
}

function withLocale(path: string, locale: string) {
  if (locale === routing.defaultLocale) {
    return path;
  }

  return `/${locale}${path}`;
}

function isMiniAppRoute(pathname: string) {
  return pathname.startsWith("/mini-app");
}

function isAdminProtectedRoute(pathname: string) {
  return pathname.startsWith("/admin") && pathname !== ADMIN_LOGIN_PATH;
}

function buildLoginRedirect(
  req: NextRequest,
  loginPath: string,
  locale: string,
) {
  const loginUrl = new URL(withLocale(loginPath, locale), req.url);

  loginUrl.searchParams.set(
    "callbackUrl",
    `${req.nextUrl.pathname}${req.nextUrl.search}`,
  );

  return NextResponse.redirect(loginUrl);
}

function getSafeCallbackUrl(req: NextRequest) {
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl");

  if (
    callbackUrl &&
    callbackUrl.startsWith("/") &&
    !callbackUrl.startsWith("//")
  ) {
    return callbackUrl;
  }

  return null;
}

export async function proxy(req: NextRequest) {
  const { locale, pathname } = getPathWithoutLocale(req.nextUrl.pathname);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
  });

  if (!token && isMiniAppRoute(pathname)) {
    return buildLoginRedirect(req, USER_LOGIN_PATH, locale);
  }

  if (!token && isAdminProtectedRoute(pathname)) {
    return buildLoginRedirect(req, ADMIN_LOGIN_PATH, locale);
  }

  if (token && pathname === USER_LOGIN_PATH) {
    return NextResponse.redirect(
      new URL(
        getSafeCallbackUrl(req) ?? withLocale(USER_DEFAULT_PATH, locale),
        req.url,
      ),
    );
  }

  if (token && pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.redirect(
      new URL(
        getSafeCallbackUrl(req) ?? withLocale(ADMIN_DEFAULT_PATH, locale),
        req.url,
      ),
    );
  }

  return handleI18nRouting(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
