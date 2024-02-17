// import CreateBooking from '../components/booking/create/CreateBooking';
// import ListBooking from '../components/booking/list/ListBooking';
import { Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { Header, Content, Footer } = Layout;

const StyledHeader = styled(Header)`
  position: sticky;
  top: 0;
  zindex: 1;
  width: 100%;
  display: flex;
  alignitems: center;
  height: 400px;
  padding-top: 10px;
`;

const ContainerMenu = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: 10px;
`;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: 'hotels',
    label: <Link to="/hotels">Hotels</Link>,
  },
  {
    key: 'register',
    label: <Link to="/register">Register</Link>,
  },
  {
    key: 'signin',
    label: <Link to="/signin">Sign-In</Link>,
  },
];

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <StyledHeader style={{}}>
        <ContainerMenu>
          <div
            className="demo-logo"
            style={{
              width: '60px',
              minWidth: '60px',
              height: '60px',
            }}
          >
            <img
              src="/logo-my-booking-2.png"
              alt="Logo My Booking"
              width="60"
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
          />
        </ContainerMenu>
      </StyledHeader>
      <Content style={{ padding: '0 48px' }}>
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        My Booking ©{new Date().getFullYear()} Created by
        Carlos Marinho
      </Footer>
    </Layout>
  );
};
// return (
//   <>
//     <h1>HostFully Booking</h1>
//     <CreateBooking />
//     <ListBooking />
//   </>
// );
// };

export default HomePage;
