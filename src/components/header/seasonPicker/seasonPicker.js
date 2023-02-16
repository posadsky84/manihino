import { connect } from 'react-redux';
import { useState } from 'react';
import { setSeason as setSeasonAC } from '../../../redux/ui-reducer';
import './seasonPicker.css';
import WrapperClickOutside from '../../../helpers/wrapperClickOutside';

const mapStateToProps = state => ({
  season: state.ui.season,
  allSeasons: state.ui.allSeasons,
});

const SeasonPicker = ({ season, allSeasons, setSeason }) => {
  const [isEditing, setIsEditing] = useState(false);

  const setSeasonAndClose = (e, newSeason) => {
    e.stopPropagation();
    setSeason(newSeason);
    setIsEditing(false);
  };

  return (
    <WrapperClickOutside closeCallback={() => setIsEditing(false)}>
      {/* для кнопок лучше использовать тег button */}
      <div className={`season-picker ${isEditing ? `open` : `closed`}`} onClick={() => setIsEditing(true)}>
        {season}
        {/* для таких компонентов лучше завести какой нибудь отдельный компонент Popup */}
        {/* и сам попап рендерить через createPortal, чтобы его точно ничего не перекрывало */}
        {isEditing
        && (
        <div className="season-picker-list">
          {allSeasons
            .map(item => <div className="season-picker-item" onClick={e => setSeasonAndClose(e, item)}>{item}</div>)} {/* key */}
        </div>
        )}
      </div>
    </WrapperClickOutside>
  );
};

export default connect(mapStateToProps, { setSeason: setSeasonAC })(SeasonPicker);
