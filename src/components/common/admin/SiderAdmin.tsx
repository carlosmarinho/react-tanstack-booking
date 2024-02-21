import React, { useContext, useState } from 'react';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../../context/auth';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

/**
 * @todo 1 remove inline css and add in styled-components
 * @todo 2 We need to create a components layouts, and pass only the children, so we won't need
 * to duplicate this layout in every page
 */
const SiderAdmin = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  /**
   * @todo we should move it to a separate file
   */
  const items: MenuItem[] = [
    getItem('User', 'sub1', <UserOutlined />, [
      getItem(
        <Link to="/admin/profile">Profile</Link>,
        '3',
      ),
    ]),
    getItem(
      <a href="#" onClick={handleLogout}>
        Logout
      </a>,
      '4',
      <LogoutOutlined />,
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SiderAdmin;