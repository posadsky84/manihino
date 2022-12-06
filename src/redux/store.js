import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import PlayersReducer from "./players-reducer";
import RatingReducer from "./rating-reducer";
import thunkMiddleware from 'redux-thunk';
import fullStoryReducer from "./fullStory-reducer";
import calendarReducer from "./calendar-reducer";
import uiReducer from "./ui-reducer";


const reducers = combineReducers({
  playerList: PlayersReducer,
  rating: RatingReducer,
  fullStory: fullStoryReducer,
  ui: uiReducer,
  calendar: calendarReducer,
});

const store = legacy_createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
