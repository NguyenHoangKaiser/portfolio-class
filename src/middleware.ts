import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { pathnames, locales, localePrefix, publicPages } from "./config";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
  localePrefix,
});

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  (req) => intlMiddleware(req),
  {
    //! Maybe we don't need this?
    callbacks: {
      authorized({ req }) {
        return req.cookies.get("next-auth.session-token") !== undefined;
      },
    },
    pages: {
      signIn: "/auth/signin",
      signOut: "/auth/signout",
      error: "/auth/signin", // Error code passed in query string as ?error=
      // verifyRequest: "/auth/verify-request",
      // newUser: "/auth/new-user",
    },
  },
);

export default function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i",
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|favicon.ico|api|_vercel|.*\\..*).*)",
  ],
};
