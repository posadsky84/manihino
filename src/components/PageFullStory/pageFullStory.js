import './pageFullStory.css';

const PageFullStory = ({ fullStory, players }) => (
  <div className="page-fullStory">
    <div className="fullStory-table">
      <div className="ddate-section">
        {fullStory.list.map(item => (
          <>
            <div className="fullStory-headerline">
              <div className="fullStory-ddate">{item.ddate.slice(0, 10)}</div>
              {players.map(({ name }) => <div className="fullStory-headerplayer">{name}</div>)}
            </div>
            {item.plays.map(playItem => (
              <div className="fullStory-line">
                <div className="fullStory-cellgame">
                  {playItem.gameName}
                  {!playItem.counts
                    && <span className="fullstory-span-counts">вне зачета</span>}
                </div>
                {players.map(playersItem => {
                  const scoreItem = playItem.results.find(resItem => resItem.playerId === playersItem.id);
                  return (
                    <div
                      className={
                          scoreItem?.winner ? `fullStory-cellscore winner` : `fullStory-cellscore`
                        }
                    >
                      {scoreItem?.score}
                    </div>
                  );
                })}
                { /* <div className="bl fullStory-cellcomment">{item.comment}</div> */ }
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  </div>
);

export default PageFullStory;
