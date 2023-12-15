import React from 'react';
import ModalScreen from '../../helpers/modalScreen';
import "./commentary.css";

const Commentary = ({closeCallback}) => {
  return (
     <ModalScreen closeCallback={closeCallback}>
       <div className="comm">
         <div className="comm-head-area">

         </div>
         <div className="comm-chat-area">

         </div>
         <div className="comm-post-area">

         </div>
       </div>
    </ModalScreen>
  );
};

export default Commentary;
