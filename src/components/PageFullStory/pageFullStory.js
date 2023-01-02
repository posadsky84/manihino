import "./pageFullStory.css";




const PageFullStory = ({fullStory, players}) => {


return (
  <div className="page-fullStory">
  <div className="fullStory-table">
    <div className="ddate-section">
      {fullStory.list.map((item) => {

        return (<>
          <div className="fullStory-headerline">
            <div className="fullStory-ddate">{item.ddate.slice(0,10)}</div>
            {players.map(({name}) => <div className="fullStory-headerplayer">{name}</div>)}
          </div>
            {item.plays.map((item) => {

              return (<>
                <div className="fullStory-line">
                  <div className="fullStory-cellgame">{item.gameName}{!item.counts && <span className="fullstory-span-counts">вне зачета</span>}</div>
                  {players.map(playersItem => {
                    const scoreItem = item.results.find((resItem) => resItem.playerId === playersItem.id);
                    return <div className={scoreItem?.winner ? "fullStory-cellscore winner" : "fullStory-cellscore"}>{scoreItem?.score}</div>;
                  })

                  }
                  {/*<div className="bl fullStory-cellcomment">{item.comment}</div>*/}
                </div>
              </>)})}
        </>
        )})
      }


    </div>
  </div>
  </div>
);

}

export default PageFullStory;