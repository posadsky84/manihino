import { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import './gamesDropDown.css';

const mapStateToProps = state => ({
  games: state.players.games,
});

//Эта функция пока что продублирована
function useOnClickOutside(ref, handler) {
  useEffect(
    () => {
      const listener = event => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);
      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },
    [ref, handler],
  );
}

const GamesDropDown = ({ games, gameId, setFieldValue }) => {
  const [isEditing, setIsEditing] = useState();
  const ref = useRef();
  useOnClickOutside(ref, () => setIsEditing(false));

  const selectGame = id => {
    setFieldValue(`gameId`, id);
    setIsEditing(false);
  };

  return (
    <>
      <div className="games-input" onClick={() => setIsEditing(true)}>
        {games.find(item => item.id === gameId)?.name}
      </div>
      {isEditing
        && (
          <div className="games-drop-down" ref={ref}>
            {games.map(({ id, name }) => <div className="games-item" key={id} onClick={() => selectGame(id)}>{name}</div>)}
          </div>
        )}
    </>
  );
};

export default connect(mapStateToProps)(GamesDropDown);
