import './header.css';
import OtherHeader from './otherheader/otherheader';
import LogoImage from './logoImage';

const Header = ({ reloadFunc }) => (
  <div className="header">
    <div className="site-logo">
      <LogoImage />
    </div>
    <OtherHeader reloadFunc={reloadFunc} />
  </div>
);

export default Header;
