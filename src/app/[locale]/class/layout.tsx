import { Layout } from "antd";
import CustomHeader from "./_components/Header";
import CustomSider from "./_components/Sider";
import { getServerAuthSession } from "~/server/auth";
import { Content } from "antd/lib/layout/layout";

export default async function ClassLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider={true}
    >
      <CustomSider fixed={true} title="Bruh" />
      <Layout>
        <CustomHeader session={session!} />
        <Content>
          <div
            style={{
              minHeight: 360,
              padding: 12,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
