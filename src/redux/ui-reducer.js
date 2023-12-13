import { API } from '../api';

const SET_SEASON = `SET_SEASON`;
const SET_ALLSEASONS = `SET_ALLSEASONS`;
const SET_COMMETARY_OPEN = `SET_COMMETARY_OPEN`;
const SET_COMMETARY_CLOSE = `SET_COMMETARY_CLOSE`;

export const setSeason = season => ({ type: SET_SEASON, season });
const setAllSeasons = allSeasons => ({ type: SET_ALLSEASONS, allSeasons });

export const getAllSeasonsThunk = () => async dispatch => {
  const response = await API.getAllSeasons();
  dispatch(setAllSeasons(response.data));
};

export const addPlayThunk = (data, callback) => async () => {
  const response = await API.addPlay(data);
  callback();
};


export const setCommentaryOpen = playIdForCommentary => ({type: SET_COMMETARY_OPEN, playIdForCommentary});
export const setCommentaryClose = () => ({type: SET_COMMETARY_CLOSE});

const initState = {
  season: new Date().getFullYear(),
  allSeasons: [],
  isCommentaryModalOpen: false,
  playIdForCommentary: null,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SEASON: {
      return {
        ...state,
        season: action.season,
      };
    }
    case SET_ALLSEASONS: {
      return {
        ...state,
        allSeasons: action.allSeasons,
      };
    }
    case SET_COMMETARY_OPEN: {
      return {
        ...state,
        isCommentaryModalOpen: true,
        playIdForCommentary: action.playIdForCommentary,
      }
    }
    case SET_COMMETARY_CLOSE: {
      return {
        ...state,
        isCommentaryModalOpen: false,
        playIdForCommentary: null,
      }
    }
    default:
      return state;
  }
};

export default uiReducer;
