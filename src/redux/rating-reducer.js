import { API } from '../api';

const SET_RATING = `SET_RATING`;
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
        res.playerId = i.player_id;
      } else if (i.wins === res.maxWins) {
        res.playerId = 0;
      }
      return res;
    }, { playerId: 0, maxWins: 0 });

    return {
      ...item,
      results: item.results.map(i => (i.player_id === champIndex.playerId ? { ...i, champion: true } : i)),
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
    default:
      return state;
  }
};

export default RatingReducer;
