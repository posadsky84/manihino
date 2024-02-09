import './header.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import PostNewPlay from './postNewPlay/postNewPlay';
import SeasonPicker from './seasonPicker/seasonPicker';
import LogoImage from './logoImage';
import { NewPlayIcon } from '../../icons';
import AuthForm from './AuthForm/authForm';
import { connect } from 'react-redux';
import { logoutThunk } from '../../redux/ui-reducer';

const mapStateToProps = state => ({
  ui: state.ui,
});

const Header = ({ ui, reloadFunc, logoutThunk }) => {
  const [showModal, setShowModal] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const logout = () => {
    logoutThunk();
    reloadFunc();
  }
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
        <div>
          {ui.loginName
            ? <div className="auth-block">
                <div className="user-block">
                  <img className="ava-block" height="50" width="50" src={`data:image/jpg;base64,${ui.ava}`} alt="ava"/>
                  <div className="">{ui.loginName}</div>
                </div>
                <div style={{cursor: 'pointer', marginLeft: "32px"}} onClick={logout}>Выход</div>
              </div>
            : <div className="auth-block">
                <div className="login-btn" onClick={() => setShowLogin(true)}>Войти</div>
              </div>
              }
          {showLogin && <AuthForm reloadFunc={reloadFunc} closeCallback={() => setShowLogin(false)}/>}
        </div>

      </div>
    </div>
  );
};

export default connect(mapStateToProps, {logoutThunk})(Header);
