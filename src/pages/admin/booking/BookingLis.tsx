import React from 'react';
import ListBooking from '../../../components/booking/list/ListBooking';
import { Layout, theme } from 'antd';
import Footer from '../../../components/common/Footer';

import HeaderAdmin from '../../../components/common/admin/HeaderAdmin';
import SiderAdmin from '../../../components/common/admin/SiderAdmin';

const { Header, Content } = Layout;

/**
 * @todo 1 remove inline css and add in styled-components
 * @todo 2 We need to create a components layouts, and pass only the children, so we won't need
 * to duplicate this layout in every page
 */
const BookingListAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <HeaderAdmin />
      <Layout style={{ minHeight: '100vh' }}>
        <SiderAdmin />
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
              <h1>List Booking</h1>
              <ListBooking />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BookingListAdmin;
