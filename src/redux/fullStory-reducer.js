import { API } from "../api";

const SET_FULLSTORY = `SET_FULLSTORY`;

const setFullStory = (list) => ({type: SET_FULLSTORY, list});
export const getFullStoryThunk = season => {
  return async dispatch => {
    const response = await API.getPlaysDetailed(season);
    dispatch(setFullStory(response.data));
  }
}

const initState = {
  list: []
};

const fullStoryReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_FULLSTORY: {
      return {
        ...state,
        list: action.list,
      }
    }
    default:
      return state;

  }



}

export default fullStoryReducer;
