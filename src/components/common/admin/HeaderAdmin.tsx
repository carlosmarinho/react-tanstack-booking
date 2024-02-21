import React from 'react';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const ContainerLogo = styled.div`
  width: 40px;
  minwidth: 40px;
  height: 40px;
  margin-right: 20px;
`;

/**
 * @todo we should move it to a separate file
 */
const items1: MenuProps['items'] = [
  {
    key: 'home-admin',
    label: <Link to="/admin  ">Administrator</Link>,
  },
  {
    key: 'home-site',
    label: <Link to="/">Got to Website</Link>,
  },
];

/**
 * @todo 1 remove inline css and add in styled-components
 * @todo 2 We need to create a components layouts, and pass only the children, so we won't need
 * to duplicate this layout in every page
 */
const HeaderAdmin = () => {
  return (
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
  );
};

export default HeaderAdmin;
