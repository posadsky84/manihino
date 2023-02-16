import './pageFullStory.css';

const PageFullStory = ({ fullStory, players }) => (
  <div className="page-fullStory">
    <div className="fullStory-table">
      <div className="ddate-section">
        {fullStory.list.map(item => (
            // <React.Fragment key={item.id}>
          <>
            <div className="fullStory-headerline">
              <div className="fullStory-ddate">{item.ddate.slice(0, 10)}</div>
              {players.map(({ name }) => <div className="fullStory-headerplayer">{name}</div>)} {/* key */}
            </div>
            {item.plays.map(playItem => (
              <div className="fullStory-line"> {/* key */}
                <div className="fullStory-cellgame">
                  {playItem.gameName}
                  {!playItem.counts
                    && <span className="fullstory-span-counts">вне зачета</span>}
                </div>
                {players.map(playersItem => {
                    /**
                     * Это скорее всего можно оптимизировать. find делает полный проход по массиву playItem.results, и так для каждого элемента из players
                     *
                     * const resultsById = playItem.results.reduce((acc, val) => {
                     *     acc[val.playerId] = val;
                     *     return acc;
                     * }, {});
                     *
                     * const scoreItem = resultsById[playersItem.id];
                     *
                     * вместо O(n^2) будет O(n) по времени
                     *
                     * любые методы которые итерируются по массиву, лучше оптимизировать, либо засовывать в useMemo
                     */
                  const scoreItem = playItem.results.find(resItem => resItem.playerId === playersItem.id);
                  return (
                      /* key */
                    <div
                      className={
                          scoreItem?.winner ? `fullStory-cellscore winner` : `fullStory-cellscore`
                        }
                    >
                      {scoreItem?.score}
                    </div>
                  );
                })}
                <div className="fullstory-cellcomment">{playItem.comment}</div>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  </div>
);

export default PageFullStory;
