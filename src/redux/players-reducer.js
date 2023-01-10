import { API } from '../api';

const SET_PLAYERS = `SET_PLAYERS`;
const SET_GAMES = `SET_GAMES`;

const initState = {
  items: [],
  games: [],
};

const setPlayers = players => ({ type: SET_PLAYERS, players });
export const setPlayersThunk = () => async dispatch => {
  const response = await API.getPlayers();
  dispatch(setPlayers(response.data));
};

const setGames = games => ({ type: SET_GAMES, games });
export const setGamesThunk = () => async dispatch => {
  const response = await API.getGames();
  dispatch(setGames(response.data));
};

const PlayersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        items: action.players.sort((a, b) => (a.id > b.id ? 1 : -1)),
      };
    case SET_GAMES:
      return {
        ...state,
        games: action.games.sort((a, b) => (a.id > b.id ? 1 : -1)),
      };
    default:
      return state;
  }
};

export default PlayersReducer;
