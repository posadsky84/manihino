import React from 'react';
import PageCalendar from "./pageCalendar";
import { connect } from "react-redux";
import { getCalendarThunk, selectDay } from "../../redux/calendar-reducer";

const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    calendar: state.calendar.data,
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
      selectDay={this.props.selectDay}
      calendar={this.props.calendar}
    />
  }

}

export default connect(mapStateToProps, {
  selectDay,
  getCalendarThunk
})(pageCalendarAPI);