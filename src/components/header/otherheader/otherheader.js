import "./otherheader.css";
import { NavLink } from "react-router-dom";
import PostNewPlay from "../postNewPlay/postNewPlay";
import { useState } from "react";


const OtherHeader = props => {

  const [showModal, setShowModal] = useState(false);


    return (
      <nav className="other-header">
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)}
                 to="/">Рейтинг</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)} to="/fullStory">Вся
          история</NavLink>
        <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)}
                 to="/calendar">Календарь</NavLink>
        <div className="post-new-play-link link-header" onClick={() => setShowModal(true)}>
          Добавить игру
          {showModal && <PostNewPlay setShowModal={setShowModal} />}
        </div>
      </nav>
    );

  };

export default OtherHeader;