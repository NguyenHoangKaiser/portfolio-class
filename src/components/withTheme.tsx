"use client";

import React from "react";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import enUS from "antd/locale/en_US";
import { useLocale } from "next-intl";

const withTheme = (node: JSX.Element) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const locale = useLocale();
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#52c41a",
          },
          cssVar: true,
          hashed: false,
        }}
        locale={locale === "en" ? enUS : viVN}
      >
        {node}
      </ConfigProvider>
    </>
  );
};

export default withTheme;
