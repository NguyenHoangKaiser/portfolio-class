import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { ThemeProvider } from "~/components/theme-provider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { locales } from "~/config";
import { useTranslations } from "next-intl";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import icEn from "../../../public/svg/icEn.svg";
import icVn from "../../../public/svg/icVn.svg";
import AntdConfigProvider from "~/components/AntdConfigProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description: "Generated by create-t3-app",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
}

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export type TLocaleOptions = {
  label: string;
  value: string;
  icon: string | StaticImport;
}[];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children, params: { locale } }: Props) {
  // Enable static rendering
  unstable_setRequestLocale(locale);
  const t = useTranslations("LocaleSwitcher");

  const localeOptions: TLocaleOptions = locales.map((locale) => ({
    label: t("locale", { locale }),
    value: locale,
    icon: locale === "vi" ? (icVn as StaticImport) : (icEn as StaticImport),
  }));

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={cn(
          "relative min-h-screen font-sans antialiased",
          inter.variable,
        )}
      >
        <TRPCReactProvider>
          <AntdRegistry>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AntdConfigProvider localeOptions={localeOptions}>
                <main className="relative flex min-h-screen flex-col">
                  <div className="flex-1 flex-grow">{children}</div>
                </main>
              </AntdConfigProvider>
            </ThemeProvider>
          </AntdRegistry>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
