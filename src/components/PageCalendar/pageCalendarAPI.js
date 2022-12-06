import React from 'react';
import PageCalendar from "./pageCalendar";
import { connect } from "react-redux";
import { selectDay } from "../../redux/calendar-reducer";

const mapStateToProps = (state) => {
  return {
    ui: state.ui
  };
}

class pageCalendarAPI extends React.Component {


  render() {
    return <PageCalendar
      season={this.props.ui.season}
      selectDay={this.props.selectDay}
    />
  }

}

export default connect(mapStateToProps, {
  selectDay
})(pageCalendarAPI);