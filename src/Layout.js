import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header/header';
import PageMain from './components/PageMain/pagemain';
import PageFullStory from './components/PageFullStory/pageFullStoryAPI';
import PageCalendar from './components/PageCalendar/pageCalendarAPI';
import Footer from './components/footer/footer';
import { setPlayersThunk } from './redux/players-reducer';

class Layout extends React.Component {
  componentDidMount() {
    this.setPlayers();
  }

  setPlayers = () => {
    this.props.setPlayersThunk();
  };

  render() {
    return (
      <div className="app-wrapper">
        <Header />
        <div className="main-area">
          <Routes>
            <Route element={<PageMain />} path="/" />
            <Route element={<PageFullStory />} path="/fullStory" />
            <Route element={<PageCalendar />} path="/calendar" />
          </Routes>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, { setPlayersThunk })(Layout);
