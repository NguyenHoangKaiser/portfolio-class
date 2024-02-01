"use client";

import { Layout, Space, theme, Typography, Avatar } from "antd";
import { useSession } from "next-auth/react";
const { Header } = Layout;
const { Text } = Typography;
const { useToken } = theme;
const CustomHeader = ({ sticky }: { sticky?: boolean }) => {
  const session = useSession();
  const { data } = session;

  const { token } = useToken();
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
          {data?.user?.name && <Text strong>{data?.user?.name}</Text>}
          {data?.user.image && (
            <Avatar src={data?.user.image} alt={data?.user?.name ?? "Avatar"} />
          )}
        </Space>
      </Space>
    </Header>
  );
};

export default CustomHeader;
