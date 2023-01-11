import { connect } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { setSeason as setSeasonAC } from '../../../redux/ui-reducer';
import './seasonPicker.css';

const mapStateToProps = state => ({
  season: state.ui.season,
  allSeasons: state.ui.allSeasons,
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

const SeasonPicker = ({ season, allSeasons, setSeason }) => {
  const [isEditing, setIsEditing] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsEditing(false));

  const setSeasonAndClose = (e, newSeason) => {
    e.stopPropagation();
    setSeason(newSeason);
    setIsEditing(false);
  };

  return (
    <div className="season-picker" onClick={() => setIsEditing(true)} ref={ref}>
      {season}
      {isEditing
        && (
        <div className="season-picker-list">
          {allSeasons
            .map(item => <div className="season-picker-item" onClick={e => setSeasonAndClose(e, item)}>{item}</div>)}
        </div>
        )}
    </div>
  );
};

export default connect(mapStateToProps, { setSeason: setSeasonAC })(SeasonPicker);
