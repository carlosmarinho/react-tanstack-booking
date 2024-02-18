import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import { device } from '../../utils';
const { Header: HeaderAnt } = Layout;

const StyledHeader = styled(HeaderAnt)`
  position: sticky;
  top: 0;
  zindex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  alignitems: center;
  height: 400px;
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
  margin: 10px 0 0 0;
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
    label: <Link to="/signin">Sign-In</Link>,
  },
];

const Header = () => {
  return (
    <StyledHeader style={{}}>
      <ContainerNav>
        <ContainerLogo className="demo-logo" style={{}}>
          <img
            src="/logo-my-booking-2.png"
            alt="Logo My Booking"
            width="60"
          />
        </ContainerLogo>

        {/**@todo was getting a problem overriding Menu
            in styled component to remove this inline style
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
          items={rightItems}
          style={{
            flex: 1,
            minWidth: 0,
            justifyContent: 'flex-end',
          }}
        />
      </ContainerNav>
      <FeaturedText>Find your next travel</FeaturedText>
      <FeaturedSubText>
        The best prices on hotels, homes and much more...
      </FeaturedSubText>
      <SearchBar />
    </StyledHeader>
  );
};

export default Header;
