"use client";

import { BulbOutlined, SlidersOutlined } from "@ant-design/icons";
import { ConfigProvider, theme as AntTheme, FloatButton } from "antd";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useCallback } from "react";
import { usePathname, useRouter } from "~/navigation";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import { type TLocaleOptions } from "~/app/[locale]/layout";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export default function AntdConfigProvider({
  children,
  localeOptions,
}: {
  children: React.ReactNode;
  localeOptions: TLocaleOptions;
}) {
  const { setTheme, theme } = useTheme();
  const locale = useLocale();
  const [mounted, setMounted] = React.useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const handleOnChange = useCallback(() => {
    router.push(pathname, { locale: locale === "en" ? "vi" : "en" });
  }, [locale, pathname, router]);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark" ? AntTheme.darkAlgorithm : AntTheme.defaultAlgorithm,
        // token: {
        //   colorPrimary: "#f2f",
        // },
        cssVar: true,
        hashed: false,
      }}
      locale={locale === "vi" ? viVN : enUS}
    >
      {children}
      <FloatButton.Group
        trigger="click"
        type="default"
        shape="square"
        icon={<SlidersOutlined />}
      >
        <FloatButton
          onClick={toggleTheme}
          icon={
            theme === "dark" ? (
              <SunIcon width={18} height={18} />
            ) : (
              <MoonIcon width={18} height={18} />
            )
          }
          tooltip={<span>{locale === "vi" ? "Chủ đề" : "Theme"}</span>}
        />
        <FloatButton
          onClick={handleOnChange}
          description={
            <Image
              src={
                locale === "vi"
                  ? (localeOptions[1]!.icon as StaticImport)
                  : (localeOptions[0]!.icon as StaticImport)
              }
              alt={locale === "vi" ? "Tiếng Việt" : "English"}
              width={22}
              height={22}
            />
          }
          tooltip={<span>{locale === "vi" ? "Ngôn ngữ" : "Language"}</span>}
        />
        <FloatButton.BackTop
          tooltip={
            <span>{locale === "vi" ? "Lên đầu trang" : "Back to top"}</span>
          }
          visibilityHeight={0}
        />
      </FloatButton.Group>
    </ConfigProvider>
  );
}
