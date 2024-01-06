import React, { useState } from 'react';
import ModalScreen from '../../helpers/modalScreen';
import "./commentary.css";
import { connect } from 'react-redux';
import { addCommentaryThunk } from '../../redux/ui-reducer';

const mapStateToProps = state => ({
  commentary: state.ui.commentary,
  players: state.players.items,
  loginName: state.ui.loginName,
});

const Commentary = ({closeCallback, commentary, players, loginName, addCommentaryThunk}) => {

  const [curComment, setCurComment] = useState("");

  const clearCallback = () => setCurComment("");
  const postCommentary = () => addCommentaryThunk(commentary.selectedItem.playId, curComment, clearCallback);

  return (
     <ModalScreen closeCallback={closeCallback} fullScreen>
       <div className="comm-box">
         <div className="comm-head-area">
          <div className="comm-head-game-name">{commentary.selectedItem.gameName}</div>
           <div className="comm-head-comment">{commentary.selectedItem.comment}</div>
           <div className="comm-mini-table-row">
           {players.map(item => <div className="playerheader" key={item.name}>{item.name}</div>)}
           </div>
           <div className="comm-mini-table-row">
             {players.map(pItem => {
               const resItem = commentary.selectedItem.results.find(k => k.playerId === pItem.id);
               return (
                 <div className={resItem?.winner ? `rating-detail-cell winner` : `rating-detail-cell`}>
                   {resItem?.score}
                 </div>
               )
             })}
           </div>
         </div>
         <div className="comm-chat-area">
           {commentary.list.map(item =>
             <div className="comm">
               <div><img className="comm-ava" height="36" width="36" src={`data:image/jpg;base64,${players.find(it => it.id === item.playerid).ava}`} alt="ava"/></div>
               {item.commtext}
             </div>)}
           {!commentary.list.length && "Комментариев пока нет..."}
         </div>

         {loginName ?
         <div className="comm-post-area">
            <textarea
              className="comm-input"
              value={curComment}
              onChange={e => setCurComment(e.target.value)}
              onKeyDown={e => {
                if (e.key === `Enter`) postCommentary();
              }}
            />
            <div className="comm-post-button" onClick={postCommentary}>пост -></div>
         </div> :
           <div style={{"margin-top": "10px"}}>Нужно залогиниться, чтобы что-то пстить</div>
        }
       </div>
    </ModalScreen>
  );
};

export default connect(mapStateToProps, {addCommentaryThunk})(Commentary);
