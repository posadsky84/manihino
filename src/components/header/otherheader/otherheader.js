import "./otherheader.css";
import { NavLink } from "react-router-dom";

const OtherHeader = () => {

  return (
      <nav className="other-header">
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)} to="/">Рейтинг</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)} to="/fullStory">Вся история</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)} to="/calendar">Календарь</NavLink>
      </nav>
  );

};

export default OtherHeader;