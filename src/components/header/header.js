import "./header.css";
import PlayersList from "./playerslist/playerslist";
import OtherHeader from "./otherheader/otherheader";
import LogoImage from "./logoImage";

const Header = () => {

  return (
    <div className="header">
      <div className="site-logo">
        <LogoImage />
      </div>
      <OtherHeader />
    </div>
  );

}

export default Header;