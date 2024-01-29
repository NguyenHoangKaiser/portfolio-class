"use client";

import React from "react";
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";

const withTheme = (node: JSX.Element) => (
  <>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#52c41a",
        },
        cssVar: true,
        hashed: false,
      }}
      locale={viVN}
    >
      {node}
    </ConfigProvider>
  </>
);

export default withTheme;
