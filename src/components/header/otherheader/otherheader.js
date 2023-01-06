import './otherheader.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostNewPlay from '../postNewPlay/postNewPlay';

const OtherHeader = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <nav className="other-header">
      <NavLink
        className={({ isActive }) => (isActive ? `link-header active` : `link-header`)}
        to="/"
      >
        Рейтинг
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? `link-header active` : `link-header`)} to="/fullStory">
        Вся история
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? `link-header active` : `link-header`)}
        to="/calendar"
      >
        Календарь
      </NavLink>
      <div className="post-new-play-link link-header" onClick={() => setShowModal(true)}>
        Добавить игру
        {showModal && <PostNewPlay setShowModal={setShowModal} />}
      </div>
    </nav>
  );
};

export default OtherHeader;
