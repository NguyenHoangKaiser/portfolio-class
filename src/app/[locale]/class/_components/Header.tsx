"use client";

import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import {
  Layout,
  Space,
  theme,
  Typography,
  Avatar,
  type MenuProps,
  Dropdown,
} from "antd";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { useRouter } from "~/navigation";
const { Header } = Layout;
const { Text } = Typography;
const { useToken } = theme;

const items: MenuProps["items"] = [
  {
    label: "Profile",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Sign out",
    key: "2",
    icon: <LogoutOutlined />,
  },
];

const signOutAsync = async () => {
  await signOut({
    callbackUrl: "/",
  });
};

const CustomHeader = ({
  sticky,
  session,
}: {
  sticky?: boolean;
  session: Session;
}) => {
  const { user } = session;
  const { token } = useToken();
  const router = useRouter();
  const onClick: MenuProps["onClick"] = useCallback(
    ({ key }: { key: string }) => {
      switch (key) {
        case "1":
          router.push("/");
          break;
        case "2":
          signOutAsync().catch(console.error);
          break;
      }
    },
    [router],
  );

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }
  return (
    <Header style={headerStyles}>
      <Space>
        <Space size="middle">
          {user?.name && <Text strong>{user?.name}</Text>}
          <Dropdown
            menu={{
              items,
              onClick: onClick,
            }}
            trigger={["hover"]}
          >
            <button
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
              className="flex rounded-full text-sm hover:outline-none hover:ring-2 hover:ring-offset-2 dark:bg-gray-800 dark:hover:ring-white dark:hover:ring-offset-gray-800"
            >
              <span className="sr-only">Open user menu</span>
              {user.image && (
                <Avatar
                  src={user.image}
                  alt={user?.name ?? "Avatar"}
                  style={{ width: 36, height: 36 }}
                />
              )}
            </button>
          </Dropdown>
        </Space>
      </Space>
    </Header>
  );
};

export default CustomHeader;
