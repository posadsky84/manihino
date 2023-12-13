import React from 'react';
import WrapperClickOutside from './wrapperClickOutside';
import './modalScreen.css';

const ModalScreen = ({closeCallback, children}) => {
  return (
    <div className="modal-back">
      <WrapperClickOutside closeCallback={closeCallback} >
        <div className="div-modal">
          {children}
        </div>
      </WrapperClickOutside>
    </div>
  );
};

export default ModalScreen;
