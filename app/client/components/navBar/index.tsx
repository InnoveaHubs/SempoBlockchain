import * as React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";

import {
  DesktopOutlined,
  SendOutlined,
  TeamOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

import { ReduxState } from "../../reducers/rootReducer";
import { replaceSpaces } from "../../utils";
import OrgSwitcher from "./OrgSwitcher";
import { Organisation } from "../../reducers/organisation/types";
import { LoginState } from "../../reducers/auth/loginReducer";

interface StateProps {
  loggedIn: boolean;
  login: LoginState | null;
  email: string | null;
  activeOrganisation: Organisation;
  organisationList: Organisation[];
}

interface DispatchProps {}

interface ComponentProps {
  pathname: string;
}

const initialState = Object.freeze({
  iconURL: "/static/media/sempo_icon.svg",
  isOrgSwitcherActive: false,
  collapsed: false
});

type Props = DispatchProps & StateProps & ComponentProps;
type State = typeof initialState;

declare global {
  interface Window {
    DEPLOYMENT_NAME: string;
  }
}

class NavBar extends React.Component<Props, State> {
  readonly state = initialState;

  componentDidMount() {
    let activeOrg = this.props.activeOrganisation;
    let orgName =
      (activeOrg && replaceSpaces(activeOrg.name).toLowerCase()) || null;
    let deploymentName = window.DEPLOYMENT_NAME;

    //TODO: Allow setting of region for this
    let s3_region = "https://sempo-logos.s3-ap-southeast-2.amazonaws.com";
    let custom_url = `${s3_region}/${orgName}.${
      deploymentName === "dev" ? "svg" : "png"
    }`;

    console.log("Custom URL is", custom_url);

    this.imageExists(custom_url, exists => {
      if (exists) {
        this.setState({
          iconURL: custom_url
        });
      }
    });
  }

  imageExists(url: string, callback: (exists: boolean) => any) {
    var img = new Image();
    img.onload = function() {
      callback(true);
    };
    img.onerror = function() {
      callback(false);
    };
    img.src = url;
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  render() {
    let { loggedIn, pathname } = this.props;
    let { iconURL, collapsed } = this.state;

    let activePath = pathname && "/" + pathname.split("/")[1];

    if (loggedIn) {
      return (
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <OrgSwitcher icon={iconURL} collapsed={collapsed}></OrgSwitcher>
          <Menu theme="dark" selectedKeys={[activePath]} mode="inline">
            <SubMenu key="sub1" icon={<DesktopOutlined />} title="Dashboard">
              <Menu.Item key="/">
                <NavLink to="/">Analytics</NavLink>
              </Menu.Item>
              <Menu.Item key="/map">
                <NavLink to="/map">Map</NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/accounts" icon={<TeamOutlined />}>
              <NavLink to="/accounts">Accounts</NavLink>
            </Menu.Item>
            <Menu.Item key="/transfers" icon={<SendOutlined />}>
              <NavLink to="/transfers">Transfers</NavLink>
            </Menu.Item>
            <Menu.Item key="/settings" icon={<SettingOutlined />}>
              <NavLink to="/settings">Settings</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
      );
    } else {
      return <div></div>;
    }
  }
}

const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    loggedIn: state.login.token != null,
    login: state.login,
    email: state.login.email,
    activeOrganisation:
      state.organisations.byId[Number(state.login.organisationId)],
    organisationList: Object.keys(state.organisations.byId).map(
      id => state.organisations.byId[Number(id)]
    )
  };
};

export default connect(mapStateToProps)(NavBar);
