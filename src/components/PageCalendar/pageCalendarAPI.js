import React from 'react';
import { connect } from 'react-redux';
import PageCalendar from './pageCalendar';
import { getCalendarThunk, selectDayThunk } from '../../redux/calendar-reducer';

const mapStateToProps = state => ({
  ui: state.ui,
  calendar: state.calendar.data,
  selectedDay: state.calendar.selectedDay,
  dayHistory: state.calendar.dayHistory,
  players: state.players.items,
});

class pageCalendarAPI extends React.Component {
  componentDidMount() {
    this.getCalendar();
  }

  componentDidUpdate(prevProps) {
    if (+prevProps.ui.season !== +this.props.ui.season) {
      this.getCalendar();
    }
  }

  getCalendar = async () => {
    this.props.getCalendarThunk(this.props.ui.season);
  };

  render() {
    return (
      <PageCalendar
        calendar={this.props.calendar}
        dayHistory={this.props.dayHistory}
        players={this.props.players}
        season={this.props.ui.season}
        selectDay={this.props.selectDayThunk}
        selectedDay={this.props.selectedDay}
      />
    );
  }
}

export default connect(mapStateToProps, {
  selectDayThunk,
  getCalendarThunk,
})(pageCalendarAPI);
