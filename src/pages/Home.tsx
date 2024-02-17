// import CreateBooking from '../components/booking/create/CreateBooking';
// import ListBooking from '../components/booking/list/ListBooking';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Footer } = Layout;

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: 'register',
    label: 'Register',
  },
  {
    key: 'signin',
    label: 'Sign-In',
  },
];

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          height: '400px',
        }}
      >
        <div
          className="demo-logo"
          style={{
            width: '120px',
            minWidth: '120px',
            height: '132px',
            background: 'rgba(255,255,255,.2)',
            borderRadius: '6px',
            marginInlineEnd: '24px',
          }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
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
