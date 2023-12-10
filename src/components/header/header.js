import './header.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostNewPlay from './postNewPlay/postNewPlay';
import SeasonPicker from './seasonPicker/seasonPicker';
import LogoImage from './logoImage';
import {NewPlayIcon} from '../../icons';

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
      </nav>
      <div className="header-bar">
        <SeasonPicker />
      <div className="post-new-play-btn" onClick={() => setShowModal(true)}>
        <NewPlayIcon />
        <div className="post-new-play-lbl">{`Добавить\nпартию`}</div>
        {showModal && <PostNewPlay reloadFunc={reloadFunc} setShowModal={setShowModal} />}
      </div>

      </div>
    </div>
  );
};

export default Header;
