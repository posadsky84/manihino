import "./pageFullStory.css";




const PageFullStory = ({fullStory, players}) => {


return (
  <div className="page-fullStory">
  <div className="fullStory-table">
    <div className="ddate-section">
      {fullStory.list.map((item) => {

        return (<>
        <div className="ddate-header">{item.ddate}</div>
          <div className="fullStory-headerline">
            <div className="fullStory-headerblock">Игра</div>
            {players.map(({name}) => <div className="fullStory-headerplayer">{name}</div>)}
          </div>
            {item.plays.map((item) => {

              return (<>
                <div className="fullStory-line">
                  <div className="bl fullStory-cellgame">{item.playId}</div>
                  <div className="bl fullStory-cellcounts">{item.counts.toString()}</div>
                  {item.results.map((item) => {

                    return (<>
                      <div className="rrr fullStory-cellplayer">{item.score}</div>
                    </>)

                  })

                  }
                  <div className="bl fullStory-cellcomment">fff</div>
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