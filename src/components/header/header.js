import './header.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostNewPlay from './postNewPlay/postNewPlay';
import SeasonPicker from './seasonPicker/seasonPicker';
import LogoImage from './logoImage';
import { NewPlayIcon } from '../../icons';
import AuthForm from './AuthForm/authForm';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ui: state.ui,
});

const Header = ({ ui, reloadFunc }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="header">
      <div className="site-logo">
        <LogoImage/>
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
        <SeasonPicker/>
        <div className="post-new-play-btn" onClick={() => setShowModal(true)}>
          <NewPlayIcon/>
          <div className="post-new-play-lbl">{`Добавить\nпартию`}</div>
          {showModal && <PostNewPlay reloadFunc={reloadFunc} setShowModal={setShowModal}/>}
        </div>
        <div className="auth-block">
          {ui.loginName
            ? <div>{ui.loginName}</div>
            : <div className="post-new-play-btn" onClick={() => setShowLogin(true)}>Войти</div>}
          {showLogin && <AuthForm closeCallback={() => setShowLogin(false)}/>}
        </div>

      </div>
    </div>
  );
};

export default connect(mapStateToProps, {})(Header);
