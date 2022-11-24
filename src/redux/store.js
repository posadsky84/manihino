import {combineReducers, legacy_createStore} from "redux";
import PlayersReducer from "./players-reducer";
import RatingReducer from "./rating-reducer";


const reducers = combineReducers({
  playerList: PlayersReducer,
  rating: RatingReducer
});

const store = legacy_createStore(reducers);

export default store;
