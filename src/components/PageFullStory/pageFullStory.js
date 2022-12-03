import "./pageFullStory.css";




const PageFullStory = ({fullStory}) => {



return (
  <div className="page-fullStory">
  <div className="fullStory-table">
    <div className="ddate-section">
      <div className="ddate-header"></div>
      <div className="fullStory-headerline">
        <div class="fullStory-headerblock">Игра</div>
        <div class="fullStory-headerblock">Зачет</div>
        <div class="fullStory-headerplayer">Леха1</div>
        <div class="fullStory-headerplayer">Леха2</div>
        <div class="fullStory-headerplayer">Леха3</div>
        <div class="fullStory-headerplayer">Леха4</div>
        <div className="fullStory-headerblock">Коммент</div>
      </div>
      <div className="fullStory-line">
        <div className="fullStory-cellgame">f</div>
        <div className="fullStory-cellcounts">f</div>
        <div className="fullStory-cellplayer">120</div>
        <div className="fullStory-cellcomment">f</div>
      </div>
    </div>
  </div>
  </div>
);

}

export default PageFullStory;