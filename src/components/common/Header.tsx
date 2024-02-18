import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const { Header: HeaderAnt } = Layout;

const StyledHeader = styled(HeaderAnt)`
  position: sticky;
  top: 0;
  zindex: 1;
  width: 100%;
  display: flex;
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
    </StyledHeader>
  );
};

export default Header;
