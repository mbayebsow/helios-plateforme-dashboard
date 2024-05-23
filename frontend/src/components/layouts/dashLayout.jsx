import { useState } from "react";
import { General } from "../../lib/config";
import { Outlet } from "react-router-dom";
import MiniSideBar from "../sideBar/miniSideBar";
import { Layout, PageHeader, Link, Space } from "@arco-design/web-react";
import { NavMenu } from "../sideBar/naveMenu";

const ghostBgStyle = {
  backgroundImage: "url('https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  //paddingTop: 5,
  //paddingBottom: 5,
  //paddingRight: 10,
  //paddingLeft: 10,
  marginBottom: 20,
  //position: "sticky",
  //top: 0,
  //zIndex: 999,
  backgroundColor: "var(--color-fill-2)",
};
const Sider = Layout.Sider;
const Content = Layout.Content;

export default function DashLayout() {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <Layout className="layout-collapse-demo">
      <Sider style={{ width: "60px" }}>
        <MiniSideBar />
      </Sider>
      <Sider theme="dark" breakpoint="lg" width={220}>
        <div className="plateforme-logo">
          {General.name}
          <span>[{General.subName}]</span>
        </div>
        <NavMenu theme="dark" style={{ width: "100%" }} />
      </Sider>
      <Layout>
        <div style={ghostBgStyle}>
          <PageHeader
            title={pageTitle}
            subTitle="This is a description"
            className="pageHeader"
            backIcon
            //onBack={}
            extra={
              <Space size="medium">
                <Link href="#" icon>
                  Racourcis
                </Link>
                <Link href="#" icon>
                  Racourcis
                </Link>
              </Space>
            }
            breadcrumb={{
              routes: [
                {
                  path: "/",
                  breadcrumbName: "Home",
                },
                {
                  path: "/channel",
                  breadcrumbName: "Channel",
                },
                {
                  path: "/news",
                  breadcrumbName: "News",
                },
              ],
            }}
          />
        </div>
        <Layout style={{ padding: "0 24px" }}>
          <Content>
            <Outlet context={[pageTitle, setPageTitle]} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
