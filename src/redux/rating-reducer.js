import { API } from '../api';

const SET_RATING = `SET_RATING`;
const SET_RATING_DETAILED = 'SET_RATING_DETAILED`'
const COLLAPSE_RATING_DETAILED = 'COLLAPSE_RATING_DETAILED';
const SET_COMMENTARY_READ = 'SET_COMMENTARY_READ';
const SET_COMMENTARY_ADD = 'SET_COMMENTARY_ADD';
export const GET_RATING_DETAILED = 'GET_RATING_DETAILED';
export const getRatingDetailed = (season, gameId) => ({type: GET_RATING_DETAILED, season, gameId});
export const setRatingDetailed = (gameId, data) => ({type: SET_RATING_DETAILED, gameId, data});
export const collapseRatingDetailed = gameId => ({type: COLLAPSE_RATING_DETAILED, gameId});
const setRating = rating => ({ type: SET_RATING, rating });
export const setCommentaryRead = (playId, gameId, ddate) => ({type: SET_COMMENTARY_READ, playId, gameId, ddate});
export const setCommentaryAdd = (playId, gameId, ddate) => ({type: SET_COMMENTARY_ADD, playId, gameId, ddate});

const initState = {
  items: [],
};

export const setRatingThunk = season => async dispatch => {
  if (!season) season = 2024; //костыль. Надо убрать замыкание совсем
  const response = await API.getRating(season);
  const result = response.data.map(item => {
    const champIndex = item.results.reduce((res, i) => {
      if (i.wins > res.maxWins) {
        res.maxWins = i.wins;
        res.playerId = i.playerId;
      } else if (i.wins === res.maxWins) {
        res.playerId = 0;
      }
      return res;
    }, { playerId: 0, maxWins: 0 });

    return {
      ...item,
      results: item.results.map(i => (i.playerId === champIndex.playerId ? { ...i, champion: true } : i)),
    };
  });
  dispatch(setRating(result));
};

const RatingReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_RATING:
      return {
        ...state,
        items: action.rating,
      };
    case SET_RATING_DETAILED:
      return {
        ...state,
        items: state.items.map(item => (item.gameId === action.gameId)
          ? {...item,
             detailed: action.data,
            }
          : item),
      };
    case COLLAPSE_RATING_DETAILED:
      return {
        ...state,
        items: state.items.map(item => (item.gameId === action.gameId) ? {...item, detailed: null} : item),
      }
    case SET_COMMENTARY_ADD:
      return {
        ...state,
        items: state.items.map(item => (item.gameId === action.gameId)
          ? {...item,
            detailed: item.detailed.map(dItem => (dItem.ddate === action.ddate)
              ?
                 {
                  ddate: dItem.ddate,
                  plays: dItem.plays.map(ddItem => (ddItem.playId === action.playId) ?
                    {...ddItem,
                        commExist: 1,
                    }
                   : ddItem
                  )
                }
              : dItem
            )
          }
          : item)
      }
    case SET_COMMENTARY_READ:
      let countUnreads = 0;
      const modifiedItems = [
        ...state.items.map(item => (item.gameId === action.gameId)
          ? {...item,
             detailed: item.detailed.map(dItem => {
               if (dItem.ddate === action.ddate) {
                 return {
                   ddate: dItem.ddate,
                   plays: dItem.plays.map(ddItem => {
                     if (ddItem.playId === action.playId) {
                       return {
                         ...ddItem,
                         unreads: 0,
                       }
                     } else {
                       if (ddItem.unreads) countUnreads += 1;
                       return ddItem;
                     }
                   })
                 }
               } else {
                 if (dItem.plays.find(ddItem => ddItem.unreads > 0)) countUnreads += 1;
                 return dItem;
               }
            })
            }
          : item)
      ];
      if (!countUnreads) modifiedItems.find(item => item.gameId === action.gameId).unreads = 0;
      return {
        ...state,
        items: modifiedItems,
      }
    default:
      return state;
  }
};

export default RatingReducer;
