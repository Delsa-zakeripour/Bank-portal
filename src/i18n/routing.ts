import { defineRouting } from "next-intl/routing";

export const locales = ["en", "fa"] as const;
export const defaultLocale = "en" as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
