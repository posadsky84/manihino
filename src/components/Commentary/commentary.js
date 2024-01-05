import React from 'react';
import ModalScreen from '../../helpers/modalScreen';
import "./commentary.css";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  commentary: state.ui.commentary,
});

const Commentary = ({closeCallback, commentary}) => {

  return (
     <ModalScreen closeCallback={closeCallback} fullScreen>
       <div className="comm">
         <div className="comm-head-area">

         </div>
         <div className="comm-chat-area">
           {commentary.list.map(item => <div>{item.commtext}</div>)}
         </div>
         <div className="comm-post-area">

         </div>
       </div>
    </ModalScreen>
  );
};

export default connect(mapStateToProps, {})(Commentary);
