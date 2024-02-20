import CreateBooking from '../../components/booking/create/CreateBooking';
import ListBooking from '../../components/booking/list/ListBooking';

import React, { useContext, useState } from 'react';
import {
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import Footer from '../../components/common/Footer';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth';

const { Header, Content, Sider } = Layout;

const ContainerLogo = styled.div`
  width: 40px;
  minwidth: 40px;
  height: 40px;
`;

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
 * @todo we should move it to a separate file
 */
const items1: MenuProps['items'] = [
  { key: 'admin-text', label: 'Administrator' },
];

/**
 * @todo 1 remove inline css and add in styled-components
 * @todo 2 We need to create a components layouts, and pass only the children, so we won't need
 * to duplicate this layout in every page
 */
const HomePageAdmin = () => {
  const { logout } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
      <a href="#" onClick={logout}>
        Logout
      </a>,
      '4',
      <LogoutOutlined />,
    ),
  ];

  return (
    <Layout>
      <Header
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ContainerLogo className="demo-logo" style={{}}>
          <Link to="/admin  ">
            <img
              src="/logo-my-booking-2.png"
              alt="Logo My Booking"
              width="40"
            />
          </Link>
        </ContainerLogo>{' '}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Layout style={{ minHeight: '100vh' }}>
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
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content style={{ margin: '0 16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

// const HomePageAdmin = () => {
//   return (
//     <>
//       <h1>HostFully Booking Administrator</h1>
//       <CreateBooking />
//       <ListBooking />
//     </>
//   );
// };

export default HomePageAdmin;
