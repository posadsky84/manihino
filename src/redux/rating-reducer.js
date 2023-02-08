import { API } from '../api';

const SET_RATING = `SET_RATING`;
const SET_RATING_DETAILED = 'SET_RATING_DETAILED`'
const COLLAPSE_RATING_DETAILED = 'COLLAPSE_RATING_DETAILED';
export const GET_RATING_DETAILED = 'GET_RATING_DETAILED';
export const getRatingDetailed = (season, gameId) => ({type: GET_RATING_DETAILED, season, gameId});
export const setRatingDetailed = (gameId, data) => ({type: SET_RATING_DETAILED, gameId, data});
export const collapseRatingDetailed = gameId => ({type: COLLAPSE_RATING_DETAILED, gameId});
const setRating = rating => ({ type: SET_RATING, rating });

const initState = {
  items: [],
};

export const setRatingThunk = season => async dispatch => {
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
    default:
      return state;
  }
};

export default RatingReducer;
