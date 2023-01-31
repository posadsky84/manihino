import './pageCalendar.css';

const PageCalendar = ({
  season,
  selectDay,
  calendar,
  dayHistory,
  players,
}) => {
  const months = [`январь`, `февраль`, `март`, `апрель`, `май`, `июнь`,
    `июль`, `август`, `сентябрь`, `октябрь`, `ноябрь`, `декабрь`];

  return (
    <div className="page-calendar">
      <div className="calendar">
        {months.map((mon, monthIndex) => {
          let dayIndex = new Date(season, monthIndex, 1).getDay();
          if (dayIndex === 0) dayIndex = 7;

          return (
            <div className="month">
              <div className="label-month">{mon}</div>
              <div className="month-card">
                {[...Array(dayIndex).keys()].map(item => (item > 0)
                  && <div className="day no-day" />)}
                {[...Array((new Date(season, monthIndex + 1, 0)).getDate()).keys()].map(item => {
                  const dayInCalendar = calendar[`${season}-${(`0${monthIndex + 1}`).slice(-2)}-${(`0${item + 1}`)
                    .slice(-2)}`];
                  const dayClass = dayInCalendar
                    ? (dayInCalendar.cnt < 4
                      ? `day with-plays plays${dayInCalendar.cnt}`
                      : `day with-plays plays4plus`)
                    : `day`;
                  return (
                    <div
                      className={dayClass}
                      onClick={() => selectDay(new Date(season, monthIndex, item + 1))}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      {!!dayHistory.length
        && (
          <div className="day-history">
            <div className="day-history-line">
              <div className="hid game-name-cell" />
              {players.map(({ name }) => <div className="player-name-cell">{name}</div>)}
            </div>
            {dayHistory.map(dayItem => (
              <div className="day-history-line">
                <div className="game-name-cell">
                  {dayItem.gameName}
                  {!dayItem.counts && <span className="span-counts">вне зачета</span>}
                </div>
                {players.map(playersItem => {
                  const scoreItem = dayItem.results.find(resItem => resItem.playerId === playersItem.id);
                  return (
                    <div className={scoreItem?.winner ? `score-cell winner` : `score-cell`}>{scoreItem?.score}</div>
                  );
                })}
                <span className="span-comment">{dayItem.comment}</span>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default PageCalendar;
