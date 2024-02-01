import { type Pathnames } from "next-intl/navigation";

export const locales = ["en", "vi"] as const;

export const publicPages = [
  "/",
  "/auth/signin",
  "/api/auth/signout",
  "/api/auth/signin",
  "/api/auth/callback",
  "/api/auth/csrf",
  "/api/auth/session",
  "/api/auth/providers",
  // Any other page not included here would require authentication.
];

// The `pathnames` object holds pairs of internal
// and external paths, separated by locale.
export const pathnames = {
  // If all locales use the same pathname, a
  // single external path can be provided.
  "/": "/",
  "/auth/signin": "/auth/signin",
  "/api/auth/signout": "/api/auth/signout",
  "/api/auth/signin": "/api/auth/signin",
  "/api/auth/callback": "/api/auth/callback",
  "/api/auth/csrf": "/api/auth/csrf",
  "/api/auth/session": "/api/auth/session",
  "/api/auth/providers": "/api/auth/providers",

  // If locales use different paths, you can
  // specify each external path per locale.
  // "/about": {
  //   en: "/about",
  //   vi: "/ueber-uns",
  // },

  // Dynamic params are supported via square brackets
  // "/news/[articleSlug]-[articleId]": {
  //   en: "/news/[articleSlug]-[articleId]",
  //   vi: "/neuigkeiten/[articleSlug]-[articleId]",
  // },

  // Also (optional) catch-all segments are supported
  // "/categories/[...slug]": {
  //   en: "/categories/[...slug]",
  //   vi: "/kategorien/[...slug]",
  // },
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
