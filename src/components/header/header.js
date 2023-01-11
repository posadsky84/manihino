import './header.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostNewPlay from './postNewPlay/postNewPlay';
import SeasonPicker from './seasonPicker/seasonPicker';
import LogoImage from './logoImage';

const Header = ({ reloadFunc }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="header">
      <div className="site-logo">
        <LogoImage />
      </div>
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
          {showModal && <PostNewPlay reloadFunc={reloadFunc} setShowModal={setShowModal} />}
        </div>
      </nav>
      <SeasonPicker />
    </div>
  );
};

export default Header;
