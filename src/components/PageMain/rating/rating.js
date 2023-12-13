import './rating.css';
import { connect } from 'react-redux';
import React from 'react';
import { collapseRatingDetailed, getRatingDetailed, setRatingThunk } from '../../../redux/rating-reducer';
import { CommentIcon, WinnerIcon } from '../../../icons';
import { setCommentaryOpen } from '../../../redux/ui-reducer';

const mapStateToProps = state => ({
  players: state.players.items,
  rating: state.rating,
  ui: state.ui,
});

class Rating extends React.Component {
  componentDidMount() {
    if (this.props.rating.items.length === 0) {
      this.props.setRatingThunk(this.props.ui.season);
    }
  }

  componentDidUpdate(prevProps) {
    if (+prevProps.ui.season !== +this.props.ui.season) {
      this.props.setRatingThunk(this.props.ui.season);
    }
  }

  onGameClick = item => {
    if (!item.detailed) {
      this.props.getRatingDetailed(this.props.ui.season, item.gameId);
    } else {
      this.props.collapseRatingDetailed(item.gameId);
    }
  };

  onCommentClick = item => {
    this.props.setCommentaryOpen(item.gameId);
  }

  render() {
    return (
      <div className="rating">
        <div className="headrow">
          <div className="gamename" />
          {this.props.players.map(item => <div className="playerheader" key={item.name}>{item.name}</div>)}
        </div>
        {this.props.rating.items.map(i => (
          <div>
            <div className="tabrow" onClick={() => this.onGameClick(i)} key={i.gameId}>
              <div className="gamename">
                {i.gameName}
                <span className="cnt-span">{i.cnt}</span>
              </div>
              {i.results.map(({ wins, champion, playerId }) => (
                <div className={`score ${champion ? `winner` : ``}`} key={playerId}>
                  {+wins || ``}
                  {champion && <WinnerIcon className="champion-medal" />}
                </div>
              ))}
            </div>
            {i.detailed?.map(dItem => dItem.plays.map(ddItem => (
              <div className="rating-detail-row">
                <div className="rating-detail-ddate">
                  <span className="rating-detail-ddate-span">
                    {`${dItem.ddate.substring(8, 10)}.${dItem.ddate.substring(5, 7)}`}
                  </span>
                  <span className="rating-detail-comm-span">{ddItem.comment}</span>
                  {!ddItem.counts && <span className="fullstory-span-counts">вне зачета</span>}
                  <div className="rating-detail-ddate-comm" onClick={() => this.onCommentClick(ddItem)}>
                    <CommentIcon />
                  </div>
                </div>
                {this.props.players.map(pItem => {
                  const resItem = ddItem.results.find(k => k.playerId === pItem.id);
                  return (
                    <div className={resItem?.winner ? `rating-detail-cell winner` : `rating-detail-cell`}>
                      {resItem?.score}
                    </div>
                  );
                })}
              </div>
            )))}
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, {
  setRatingThunk,
  getRatingDetailed,
  collapseRatingDetailed,
  setCommentaryOpen,
})(Rating);
