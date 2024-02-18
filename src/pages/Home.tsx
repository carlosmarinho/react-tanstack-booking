import { Layout, theme } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
const { Content } = Layout;

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
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
      <Footer />
    </Layout>
  );
};

export default HomePage;
