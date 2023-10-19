import { useContext, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TeamOutlined,
  TableOutlined,
  LogoutOutlined,
  CommentOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Layout, Menu, Button, theme } from "antd";

import "./adminLayout.css";
import { AuthContext } from "../../../context/AuthContext";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { logout } = useContext(AuthContext);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider theme="light" trigger={null} collapsible collapsed={collapsed}>
        <div className="aside-logo">{collapsed ? "LMS" : "LMS admin"}</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/userControl",
              icon: <TeamOutlined />,
              label: <Link to="/userControl">Users</Link>,
            },
            {
              key: "/categoryControl",
              icon: <TableOutlined />,
              label: <Link to="/categoryControl">Categories</Link>,
            },
            {
              key: "/postControl",
              icon: <BlockOutlined />,
              label: <Link to="/postControl">Posts</Link>,
            },
            {
              key: "/commentControl",
              icon: <CommentOutlined />,
              label: <Link to="/commentControl">Comments</Link>,
            },
            {
              key: "4",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: () => logout(navigate),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="layout-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

AdminLayout.propTypes = {
  setIsLogin: PropTypes.func,
};

export default AdminLayout;
