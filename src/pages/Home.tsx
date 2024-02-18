import { Layout, theme } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
const { Content } = Layout;

const MainContent = styled(Content)`
  min-width: 296px;
  padding: 0 48px;
`;

const ContentWrapper = styled.div`
  padding: 24px;
  min-height: 450px;
  min-width: 200px;
`;

const HomePage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Header />
      <MainContent style={{}}>
        <ContentWrapper
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
        </ContentWrapper>
      </MainContent>
      <Footer />
    </Layout>
  );
};

export default HomePage;
