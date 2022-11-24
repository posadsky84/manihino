

const SET_RATING = "SET_RATING";
export const setRatingAC = (rating) => ({type: SET_RATING, rating});


const initState = {
  items: []
};

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