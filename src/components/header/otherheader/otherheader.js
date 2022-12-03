import "./otherheader.css";
import { NavLink } from "react-router-dom";

const OtherHeader = () => {

  return (
    <div className="otherheader">
      <nav className="nav-header">
        <NavLink className="link-header" to="/">Рейтинг</NavLink>
        <NavLink className="link-header" to="/fullStory">Вся история</NavLink>
      </nav>
    </div>
  );

};

export default OtherHeader;