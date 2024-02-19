import { Layout } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import Reserve from '../components/Reserve/Reserve';
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

const ReservePage = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  return (
    <Layout>
      <Header onSearch={onFinish} showSearchBar={false} />
      <MainContent>
        <ContentWrapper>
          <Reserve />
        </ContentWrapper>
      </MainContent>
      <Footer />
    </Layout>
  );
};

export default ReservePage;
