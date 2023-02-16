import './rating.css';
import { connect } from 'react-redux';
import React from 'react';
import { collapseRatingDetailed, getRatingDetailed, setRatingThunk } from '../../../redux/rating-reducer';
import WinnerIcon from '../../../winnerIcon';

const mapStateToProps = state => ({
  players: state.players.items,
  rating: state.rating,
  ui: state.ui,
  test: state.rating.items,
});

/**
 * Лучше использовать функциональные компоненты
 */
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

  /**
   * на этот клик лучше показывать статус загрузки
   * не сразу понятно что после клика идет запрос, начинает казаться что проблемы с производительностью
   *
   * И результат этого запроса можно (и нужно) кешировать, чтобы при повторном клике опять не ждать загрузки
   *
   * такое обычно делают через useQuery https://tanstack.com/query/v4/docs/react/reference/useQuery
   * вроде у редакса есть что то похожее, принцип работы у них один и тот же
   */
  onGameClick = item => {
    if (!item.detailed) {
      this.props.getRatingDetailed(this.props.ui.season, item.gameId);
    } else {
      this.props.collapseRatingDetailed(item.gameId);
    }
  };

  render() {
    return (

      <div className="rating">
        <div className="headrow">
          <div className="gamename" />
          {this.props.players.map(item => <div className="playerheader" key={item.name}>{item.name}</div>)}
        </div>
        {this.props.rating.items.map(i => (
            /**
             * key нужно указывать в этом диве, а не в следующем
             */
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
                /* нужен key */
              <div className="rating-detail-row">
                <div className="rating-detail-ddate">
                  {/* классы лучше называть так чтобы было понятно что это за элемент */}
                  {/* и можно использовать https://www.npmjs.com/package/@bem-react/classname */}
                  <span className="rating-detail-ddate-span">
                    {`${dItem.ddate.substring(8, 10)}.${dItem.ddate.substring(5, 7)}`}
                  </span>
                  <span className="rating-detail-comm-span">{ddItem.comment}</span>
                  {!ddItem.counts && <span className="fullstory-span-counts">вне зачета</span>}
                </div>
                {this.props.players.map(pItem => {
                  const resItem = ddItem.results.find(k => k.playerId === pItem.id);
                  return (
                      // тоже нужен key, можно настроить линтер чтобы он показывал такие моменты (react/jsx-key)
                      // если класс зависит от переменной, то в @bem-react/classname можно красиво это обрабатывать
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
})(Rating);
