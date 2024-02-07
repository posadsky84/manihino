import React, { useState } from 'react';
import ModalScreen from '../../helpers/modalScreen';
import "./commentary.css";
import { connect } from 'react-redux';
import { addCommentaryThunk } from '../../redux/ui-reducer';
import { SendIcon } from '../../icons';

const mapStateToProps = state => ({
  commentary: state.ui.commentary,
  ui: state.ui,
  players: state.players.items,
  loginName: state.ui.loginName,
});

const Commentary = ({closeCallback, commentary, ui, players, loginName, addCommentaryThunk}) => {

  const [curComment, setCurComment] = useState("");

  const clearCallback = () => setCurComment("");
  const postCommentary = () => addCommentaryThunk(
    commentary.selectedItem.playId,
    curComment,
    clearCallback
  );

  return (
     <ModalScreen closeCallback={closeCallback} fullScreen>
       <div className="comm-box">
         <div className="comm-head-area">
          <div>
          <div className="comm-head-game-name">{commentary.selectedItem.gameName}</div>
          <div className="comm-head-ddate">04.01</div>
          </div>
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

           {commentary.list.map((item, index, arr) =>
             <>
             <div className={`comm ${item.playerId === ui.playerId ? "yours" : ""}`}>
               <div className="comm-ava"><img height="36" width="36" src={`data:image/jpg;base64,${players.find(it => it.id === item.playerId).ava}`} alt="ava"/></div>
               <div className="comm-bubble">
                 <div className="comm-caption">{item.playerName}</div>
                 <div className="comm-body">{item.commText}</div>
               </div>
             </div>
             {(index < arr.length - 1) && !!item.lastReadFlag && <div className="comm-unread-block">Непрочитанные сообщения</div>}
             </>)
           }
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
            <div className="comm-post-button" onClick={postCommentary}>
              <SendIcon />
            </div>
         </div> :
           <div style={{"margin-top": "10px"}}>Нужно залогиниться, чтобы что-то пстить</div>
        }
       </div>
    </ModalScreen>
  );
};

export default connect(mapStateToProps, {addCommentaryThunk})(Commentary);
