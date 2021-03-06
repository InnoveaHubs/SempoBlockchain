import * as React from "react";
import { Layout, Typography } from "antd";
import { CenterLoadingSideBarActive } from "../styledElements";

import NavBar from "../navBar";
import { isMobileQuery, withMediaQuery } from "../helpers/responsive";

import IntercomSetup from "../intercom/IntercomSetup";
import MessageBar from "../messageBar";
import ErrorBoundary from "../ErrorBoundary";
import LoadingSpinner from "../loadingSpinner";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

interface OuterProps {
  noNav?: boolean;
  location?: any;
  footer?: boolean;
  isAntDesign?: boolean;
  title?: string;
  isMobile?: boolean;
  component?: React.ComponentClass | React.FunctionComponent;
}

const Page: React.FunctionComponent<OuterProps> = props => {
  const {
    footer = true,
    isAntDesign = false,
    noNav,
    location,
    title,
    isMobile = false,
    component: Component = React.Component
  } = props;

  const [collapsed, setCollapsed] = React.useState(false);

  React.useEffect(() => {
    let sideBarCollapsedString = localStorage.getItem("sideBarCollapsed");
    if (sideBarCollapsedString) {
      setCollapsed(localStorage.getItem("sideBarCollapsed") === "true");
    }
  }, []);

  let onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    localStorage.setItem("sideBarCollapsed", collapsed.toString());
  };

  return (
    <ErrorBoundary>
      <IntercomSetup />
      <MessageBar />

      <Layout style={{ minHeight: "100vh" }}>
        {noNav ? null : (
          <NavBar
            pathname={location.pathname}
            onCollapse={onCollapse}
            collapsed={collapsed}
          />
        )}

        <div
          onClick={() => setCollapsed(true)}
          style={
            noNav
              ? undefined
              : isMobile
              ? collapsed
                ? undefined
                : {
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,.45)",
                    position: "fixed",
                    zIndex: 1
                  }
              : undefined
          }
        />

        <Layout
          className="site-layout"
          style={
            noNav
              ? undefined
              : isMobile
              ? undefined
              : collapsed
              ? { marginLeft: "80px" }
              : { marginLeft: "200px" }
          }
        >
          {title ? (
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Title>{title}</Title>
            </Header>
          ) : null}
          <Content style={{ margin: isAntDesign ? "0 16px" : "" }}>
            <React.Suspense
              fallback={
                <CenterLoadingSideBarActive>
                  <LoadingSpinner />
                </CenterLoadingSideBarActive>
              }
            >
              <Component {...props} />
            </React.Suspense>
          </Content>
          {footer ? (
            <Footer style={{ textAlign: "center" }}>Sempo ©2020</Footer>
          ) : null}
        </Layout>
      </Layout>
    </ErrorBoundary>
  );
};
export default withMediaQuery([isMobileQuery])(Page);
