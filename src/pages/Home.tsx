import { Layout } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import SearchResult from '../components/Result/SearchResult';
const { Content } = Layout;

const MainContent = styled(Content)`
  min-width: 296px;
  padding: 0 48px;
`;

const ContentWrapper = styled.div`
  padding: 24px;
  min-height: 550px;
  min-width: 200px;
  background: #ffffff;
  border-radius: 8;
`;

const HomePage = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Layout>
      <Header onSearch={onFinish} />
      <MainContent>
        <ContentWrapper>
          <SearchResult />
        </ContentWrapper>
      </MainContent>
      <Footer />
    </Layout>
  );
};

export default HomePage;
