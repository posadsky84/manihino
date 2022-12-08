import { API } from "../api";

const SELECT_DAY = `SELECT_DAY`;
const SET_CALENDAR = `SET_CALENDAR`;

const initState = {
  data: {},
  selectedDay: null,
  dayHistory: []
};

export const selectDay = selectedDay => ({type: SELECT_DAY, selectedDay});
const setCalendar = calendar => ({type: SET_CALENDAR, calendar});

export const getCalendarThunk = season => async dispatch => {
  let response = await API.getCalendar(season);
  if (response.status === 200) {
    return dispatch(setCalendar(response.data));
  }

};

const calendarReducer = (state = initState, action) => {
  switch (action.type) {
    case SELECT_DAY: {
      return {
        ...state,
        selectedDay: action.selectedDay,
      };
    }
    case SET_CALENDAR: {
      return {
        ...state,
        data: action.calendar,
      }
    }
    default:
      return state;
  }

}


export default calendarReducer;