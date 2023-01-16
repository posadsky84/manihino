import { useState } from 'react';
import { connect } from 'react-redux';
import './gamesDropDown.css';
import WrapperClickOutside from '../../../../helpers/wrapperClickOutside';

const mapStateToProps = state => ({
  games: state.players.games,
});

const GamesDropDown = ({ games, gameId, setFieldValue }) => {
  const [isEditing, setIsEditing] = useState(false);

  const selectGame = id => {
    setFieldValue(`gameId`, id);
    setIsEditing(false);
  };

  return (
    <WrapperClickOutside closeCallback={() => setIsEditing(false)}>
      <div className="games-input" onClick={() => setIsEditing(true)}>
        {games.find(item => item.id === gameId)?.name}
      </div>
      {isEditing
        && (
          <div className="games-drop-down">
            {games.map(({ id, name }) => (
              <div className="games-item" key={id} onClick={() => selectGame(id)}>
                {name}
              </div>
            ))}
          </div>
        )}
    </WrapperClickOutside>
  );
};

export default connect(mapStateToProps)(GamesDropDown);
