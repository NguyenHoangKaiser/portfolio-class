"use client";

import React from "react";
import { Layout, Menu, Grid, Drawer, Button, theme } from "antd";
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Link, useRouter } from "~/navigation";
import { Session } from "next-auth";

const { SubMenu } = Menu;
const { useToken } = theme;

const CustomSider = ({
  session,
  fixed,
}: {
  session: Session;
  fixed?: boolean;
}) => {
  const [siderCollapsed, setSiderCollapsed] = React.useState(false);
  const { token } = useToken();
  const router = useRouter();
  const { user } = session;

  const siderStyles: React.CSSProperties = {
    backgroundColor: token.colorBgContainer,
    borderRight: `1px solid ${token.colorBgElevated}`,
  };

  if (fixed) {
    siderStyles.position = "fixed";
    siderStyles.top = 0;
    siderStyles.height = "100vh";
    siderStyles.zIndex = 999;
  }

  return (
    <>
      {fixed && (
        <div
          style={{
            width: siderCollapsed ? "80px" : "200px",
            transition: "all 0.2s",
          }}
        />
      )}
      <Layout.Sider
        style={siderStyles}
        collapsible
        collapsed={siderCollapsed}
        onCollapse={(collapsed, type) => {
          if (type === "clickTrigger") {
            setSiderCollapsed(collapsed);
          }
        }}
        collapsedWidth={80}
        breakpoint="lg"
        trigger={
          <Button
            type="text"
            style={{
              borderRadius: 0,
              height: "100%",
              width: "100%",
              backgroundColor: token.colorBgElevated,
            }}
          >
            {siderCollapsed ? (
              <RightOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            ) : (
              <LeftOutlined
                style={{
                  color: token.colorPrimary,
                }}
              />
            )}
          </Button>
        }
      >
        <div
          style={{
            width: siderCollapsed ? "80px" : "200px",
            padding: siderCollapsed ? "0" : "0 16px",
            display: "flex",
            justifyContent: siderCollapsed ? "center" : "flex-start",
            alignItems: "center",
            height: "64px",
            backgroundColor: token.colorBgElevated,
            fontSize: "14px",
          }}
        >
          <Link href="/"></Link>
        </div>
        {/* <Menu
          selectedKeys={selectedKey ? [selectedKey] : []}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          style={{
            paddingTop: "8px",
            border: "none",
            overflow: "auto",
            height: "calc(100% - 72px)",
          }}
          onClick={() => {
            setMobileSiderOpen(false);
          }}
        >
          <>
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link href="/">{""}</Link>
              {!siderCollapsed && selectedKey === "/" && (
                <div className="ant-menu-tree-arrow" />
              )}
            </Menu.Item>
          </>
        </Menu> */}
      </Layout.Sider>
    </>
  );
};

export default CustomSider;
