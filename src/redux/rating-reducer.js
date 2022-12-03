import { API } from "../api";


const SET_RATING = "SET_RATING";
const setRating = (rating) => ({type: SET_RATING, rating});


const initState = {
  items: []
};

export const setRatingThunk = () => {
  return async dispatch => {

      const response = await API.getRating();
      dispatch(setRating(response.data));

  }
}

const RatingReducer = (state = initState, action) => {

  switch (action.type) {
    case SET_RATING:
      return {
        ...state,
        items: action.rating
      }
    default:
      return state;

  }




};

export default RatingReducer;