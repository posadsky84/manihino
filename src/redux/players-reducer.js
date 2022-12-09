import { API } from "../api";

const SET_PLAYERS = `SET_PLAYERS`;


const initState = {
  items: []
};

const setPlayers = players => ({ type: SET_PLAYERS, players });
export const setPlayersThunk = () => async dispatch => {
  const response = await API.getPlayers();
  dispatch(setPlayers(response.data));
}

const PlayersReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_PLAYERS:
      return {
        ...state,
        items: action.players.sort((a, b) => a.id > b.id ? 1 : -1)
      };
    default:
      return state;
  }
};

export default PlayersReducer;