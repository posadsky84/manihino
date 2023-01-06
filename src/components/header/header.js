import './header.css';
import OtherHeader from './otherheader/otherheader';
import LogoImage from './logoImage';

const Header = () => (
  <div className="header">
    <div className="site-logo">
      <LogoImage />
    </div>
    <OtherHeader />
  </div>
);

export default Header;
