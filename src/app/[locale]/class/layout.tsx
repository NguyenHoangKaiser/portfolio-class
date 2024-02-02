import { Layout } from "antd";
import CustomHeader from "./_components/Header";
import CustomSider from "./_components/Sider";
import { Content } from "antd/lib/layout/layout";
import { checkServerSession } from "~/server/auth";

export default async function ClassLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await checkServerSession();

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
      hasSider={true}
    >
      <CustomSider fixed={true} session={session} />
      <Layout>
        <CustomHeader session={session} />
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
