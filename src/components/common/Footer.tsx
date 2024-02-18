import { Layout } from 'antd';

const { Footer: FooterAnt } = Layout;

const Footer = () => {
  return (
    <FooterAnt style={{ textAlign: 'center' }}>
      My Booking ©{new Date().getFullYear()} Created by
      Carlos Marinho
    </FooterAnt>
  );
};

export default Footer;
