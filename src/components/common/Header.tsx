import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar, { ISearchBar } from './SearchBar';
import { device } from '../../utils';
import { FC, useContext } from 'react';
import AuthContext from '../../context/auth';
const { Header: HeaderAnt } = Layout;

const StyledHeader = styled(HeaderAnt)<{
  $showSearchBar: boolean;
}>`
  position: sticky;
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  height: ${(p) => (p.$showSearchBar ? '400px' : '100px')};
  padding-top: 10px;
`;

const ContainerNav = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  margin-top: 10px;
`;

const ContainerLogo = styled.div`
  width: 60px;
  minwidth: 60px;
  height: 60px;
`;

const FeaturedText = styled.h2`
  text-align: center;
  margin: 20px 0 0 0;
  color: #ffffff;
  font-size: 20px;
  min-width: 200px;

  @media ${device.mobileL} {
    margin: 20px 0 0 0;
    font-size: 30px;
  }

  @media ${device.tablet} {
    font-size: 40px;
    margin: 70px 0 0 0;
  }

  @media ${device.desktop} {
    margin: 90px 0 0 0;
    font-size: 50px;
  }
`;

const FeaturedSubText = styled.p`
  display: none;

  @media ${device.tablet} {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #ffffff;
    font-size: 25px;
  }

  @media ${device.laptop} {
    font-size: 30px;
    margin-top: 40px;
  }
`;

interface IHeader extends ISearchBar {
  showSearchBar?: boolean;
}

const Header: FC<IHeader> = ({
  onSearch,
  showSearchBar = true,
}) => {
  const { setTokens, authTokens, isLogged, logout } =
    useContext(AuthContext);

  const handleLogin = () => {
    /**
     * @todo implement login, now here we are only mocking this api
     */
    setTokens({
      id: 1,
      username: 'carlos',
      email: 'carlos@gmail.com',
      blocked: false,
      confirmed: true,
    });
  };

  /**
   * @todo we should move it to a separate file
   */
  const leftItems = [
    {
      key: 'hotels',
      label: <Link to="/hotels">Hotels</Link>,
    },
  ];
  const rightItems = [
    {
      key: 'register',
      label: <Link to="/register">Register</Link>,
    },
    {
      key: 'signin',
      label: (
        <a href="#" onClick={handleLogin}>
          Sign-In
        </a>
      ),
    },
  ];

  const rightItemsLogged = [
    {
      key: 'welcome-user',
      label: `Welcome ${authTokens.username.toUpperCase()}!`,
    },
    {
      key: 'my-bookings',
      label: <Link to="/my-bookings">My Bookings</Link>,
    },
    {
      key: 'logout',
      label: (
        <a href="#" onClick={logout}>
          Logout
        </a>
      ),
    },
    {
      key: 'admin',
      label: <Link to="/admin">Admin</Link>,
    },
  ];

  return (
    <StyledHeader $showSearchBar={showSearchBar}>
      <ContainerNav>
        <ContainerLogo className="demo-logo" style={{}}>
          <Link to="/">
            <img
              src="/logo-my-booking-2.png"
              alt="Logo My Booking"
              width="60"
            />
          </Link>
        </ContainerLogo>

        {/**
         * @todo was getting a problem overriding Menu
         * in styled component to remove this inline style
         */}
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={leftItems}
          style={{ flex: 1, minWidth: 0 }}
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={isLogged ? rightItemsLogged : rightItems}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'flex-end',
          }}
        />
      </ContainerNav>
      {showSearchBar && (
        <>
          <FeaturedText>Find your next travel</FeaturedText>
          <FeaturedSubText>
            The best prices on hotels, homes and much
            more...
          </FeaturedSubText>
          <SearchBar onSearch={onSearch} />
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
