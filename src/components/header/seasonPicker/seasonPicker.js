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
      <div className="season-picker" onClick={() => setIsEditing(true)}>
        {season}
        {isEditing
        && (
        <div className="season-picker-list">
          {allSeasons
            .map(item => <div className="season-picker-item" onClick={e => setSeasonAndClose(e, item)}>{item}</div>)}
        </div>
        )}
      </div>
    </WrapperClickOutside>
  );
};

export default connect(mapStateToProps, { setSeason: setSeasonAC })(SeasonPicker);
