import "./pageFullStory.css";




const PageFullStory = ({fullStory}) => {


return (
  <div className="page-fullStory">
  <div className="fullStory-table">
    <div className="ddate-section">
      {fullStory.list.map((item) => {

        return (<>
        <div className="ddate-header">{item.ddate}</div>
          <div className="fullStory-headerline">
            <div className="fullStory-headerblock">Игра</div>
            <div className="fullStory-headerblock">Зачет</div>
            <div className="fullStory-headerplayer">Леха1</div>
            <div className="fullStory-headerplayer">Леха2</div>
            <div className="fullStory-headerplayer">Леха3</div>
            <div className="fullStory-headerplayer">Леха4</div>
            <div className="fullStory-headerblock">Коммент</div>
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