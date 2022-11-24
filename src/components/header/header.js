import "./header.css";
import PlayersList from "./playerslist/playerslist";
import OtherHeader from "./otherheader/otherheader";

const Header = () => {

  return (
    <div className="header">
      <PlayersList />
      <OtherHeader />
    </div>
  );

}

export default Header;