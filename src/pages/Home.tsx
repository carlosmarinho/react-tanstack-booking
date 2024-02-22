import { Layout } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import SearchResult from '../components/Result/SearchResult';
import { useState } from 'react';
import { ISearchBarValues } from '../components/common/ISearchBar';
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
  /**
   * @todo create a context for searchBar values and onFinish function
   */
  const [searchBar, setSearchBar] =
    useState<ISearchBarValues>();
  const onFinish = (values: ISearchBarValues) => {
    setSearchBar(values);
  };

  return (
    <Layout>
      <Header onSearch={onFinish} />
      <MainContent>
        <ContentWrapper>
          <SearchResult searchBarValues={searchBar} />
        </ContentWrapper>
      </MainContent>
      <Footer />
    </Layout>
  );
};

export default HomePage;
