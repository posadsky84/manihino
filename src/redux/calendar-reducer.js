const SELECT_DAY = `SELECT_DAY`;

const initState = {
  calendar: {},
  selectedDay: null,
  dayHistory: []
};

export const selectDay = (selectedDay) => ({type: SELECT_DAY, selectedDay});

const calendarReducer = (state = initState, action) => {
  switch (action) {
    case SELECT_DAY: {
      return {
        ...state,
        selectedDay: action.selectedDay
      };
    }
    default:
      return state;
  }

}


export default calendarReducer;