import { API } from "../api";

const SELECT_DAY = `SELECT_DAY`;
const SET_CALENDAR = `SET_CALENDAR`;

const initState = {
  data: {},
  selectedDay: null,
  dayHistory: [],
};

const selectDay = (selectedDay, dayHistory) => ({ type: SELECT_DAY, selectedDay, dayHistory });
const setCalendar = calendar => ({ type: SET_CALENDAR, calendar });

export const selectDayThunk = selectedDay => async dispatch => {
  const response = await API.getPlaysDetailed(
    null,
    null,
    `'${selectedDay.getFullYear()}-${selectedDay.getMonth() + 1}-${selectedDay.getDate()}'`,
  );
  if (response.status === 200) {
    return dispatch(selectDay(selectedDay, response.data[0]?.plays || []));
  }
};

export const getCalendarThunk = season => async dispatch => {
  const response = await API.getCalendar(season);
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
        dayHistory: action.dayHistory,
      };
    }
    case SET_CALENDAR: {
      return {
        ...state,
        data: action.calendar,
        dayHistory: [],
      };
    }
    default:
      return state;
  }
};

export default calendarReducer;
