import { Layout, Grid } from "antd";
import CustomHeader from "./_components/Header";
import CustomSider from "./_components/Sider";
const { Content } = Layout;

export function ClassLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const breakpoint = Grid.useBreakpoint();
  const isSmall = typeof breakpoint.sm === "undefined" ? true : breakpoint.sm;
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider={true}
    >
      <CustomSider fixed={true} title="Bruh" />
      <Layout>
        <CustomHeader />
        <Content>
          <div
            style={{
              minHeight: 360,
              padding: isSmall ? 24 : 12,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
