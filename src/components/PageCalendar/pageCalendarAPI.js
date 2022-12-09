import React from 'react';
import PageCalendar from "./pageCalendar";
import { connect } from "react-redux";
import { getCalendarThunk, selectDayThunk } from "../../redux/calendar-reducer";

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    calendar: state.calendar.data,
    selectedDay: state.calendar.selectedDay,
    dayHistory: state.calendar.dayHistory,
    players: state.players.items,
  };
}

class pageCalendarAPI extends React.Component {

  componentDidMount() {
    this.getCalendar();
  }

  getCalendar = async () => {
    this.props.getCalendarThunk(this.props.ui.season);
  }

  render() {
    return <PageCalendar
      season={this.props.ui.season}
      selectDay={this.props.selectDayThunk}
      calendar={this.props.calendar}
      selectedDay={this.props.selectedDay}
      dayHistory={this.props.dayHistory}
      players={this.props.players}
    />
  }

}

export default connect(mapStateToProps, {
  selectDayThunk,
  getCalendarThunk,
})(pageCalendarAPI);