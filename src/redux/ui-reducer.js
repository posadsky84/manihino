import { API } from '../api';

const SET_SEASON = `SET_SEASON`;
const SET_ALLSEASONS = `SET_ALLSEASONS`;
const SET_COMMETARY_OPEN = `SET_COMMETARY_OPEN`;
const SET_COMMETARY_CLOSE = `SET_COMMETARY_CLOSE`;
const SET_USER = `SET_USER`;

export const loginThunk = (login, password, onSuccess) => async dispatch => {
  try {
    const response = await API.login(login, password);
    if (response.status === 200) {
      localStorage.setItem(`token`, response.data.token);
    } else if (response.status === 401) {
      //неверный логин и пароль
    } else {
      //неизвестная ошибка
    }
    const response2 = await API.currentUser();
    if (response2.status === 200) {
      dispatch(setUser(response2.data));
      onSuccess();
    } else {

    }

  } catch (error) {

  }
};

export const currentUserThunk = () => async dispatch => {
  const response2 = await API.currentUser();
  if (response2.status === 200) {
    dispatch(setUser(response2.data));
  } else {

  }
}

const setUser = data => ({type: SET_USER, data});

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
  loginName: null,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        loginName: action.data.loginName,
      };
    }
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
