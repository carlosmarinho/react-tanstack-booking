import { Layout } from 'antd';
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
  min-height: 550px;
  min-width: 200px;
  background: #ffffff;
  border-radius: 8;
`;

const NotFound = () => {
  return (
    <Layout>
      <Header showSearchBar={false} />
      <MainContent>
        <ContentWrapper>
          <h2>There is nothing here: 404!</h2>
        </ContentWrapper>
      </MainContent>
      <Footer />
    </Layout>
  );
};

export default NotFound;
