import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
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
  const { logout, isLogged } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if (!isLogged) {
      navigate('/', { replace: true });
    }
  }, [isLogged]);

  /**
   * @todo we should move it to a separate file
   */
  const items: MenuItem[] = [
    getItem('Booking', 'booking', <HomeOutlined />, [
      getItem(
        <Link to="/admin/booking/create">Create</Link>,
        '1',
      ),
      getItem(
        <Link to="/admin/booking/list">List</Link>,
        '2',
      ),
    ]),
    getItem('User', 'user', <UserOutlined />, [
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
