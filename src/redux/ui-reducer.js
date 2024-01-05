import { API } from '../api';

const SET_SEASON = `SET_SEASON`;
const SET_ALLSEASONS = `SET_ALLSEASONS`;
const SET_COMMETARY_OPEN = `SET_COMMETARY_OPEN`;
const SET_COMMETARY_CLOSE = `SET_COMMETARY_CLOSE`;
const SET_USER = `SET_USER`;
const LOGOUT_USER = `LOGOUT_USER`;
const SET_COMMENTARY_LIST = `SET_COMMENTARY_LIST`;

export const logoutThunk = () => async dispatch => {
  localStorage.removeItem(`token`);
  dispatch(logoutUser());
}

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
const logoutUser = () => ({type: LOGOUT_USER});


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

export const getCommentaryThunk = playId => async dispatch => {
  const response = await API.getCommentary(playId);
  dispatch(setCommentaryList(response.data));
};

const setCommentaryList = list => ({type: SET_COMMENTARY_LIST, list});

export const setCommentaryOpen = playIdForCommentary => ({type: SET_COMMETARY_OPEN, playIdForCommentary});
export const setCommentaryClose = () => ({type: SET_COMMETARY_CLOSE});

const initState = {
  season: new Date().getFullYear(),
  allSeasons: [],
  commentary: {
    isModalOpen: false,
    playId: null,
    list: [],
  },
  loginName: null,
  ava: null,
};

const uiReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        loginName: action.data.loginName,
        ava: action.data.ava,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        loginName: null,
      }
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
        commentary: {
          ...initState.commentary,
          isModalOpen: true,
        },

      }
    }
    case SET_COMMENTARY_LIST: {
      return {
        ...state,
        commentary: {
          ...state.commentary,
          list: action.list,
        },
      }
    }
    case SET_COMMETARY_CLOSE: {
      return {
        ...state,
        commentary: {
          ...initState.commentary,
        },
      }
    }
    default:
      return state;
  }
};

export default uiReducer;
