import React from 'react';
import WrapperClickOutside from './wrapperClickOutside';
import './modalScreen.css';

const ModalScreen = ({closeCallback, children, fullScreen}) => {
  return (
    <div className="modal-back">
      <WrapperClickOutside closeCallback={closeCallback} >
        <div className={`div-modal ${fullScreen ? `fullscreen` : ``}`}>
          {children}
        </div>
      </WrapperClickOutside>
    </div>
  );
};

export default ModalScreen;
