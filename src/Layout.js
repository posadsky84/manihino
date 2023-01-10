import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/header/header';
import PageMain from './components/PageMain/pagemain';
import PageFullStory from './components/PageFullStory/pageFullStoryAPI';
import PageCalendar from './components/PageCalendar/pageCalendarAPI';
import Footer from './components/footer/footer';
import { setPlayersThunk, setGamesThunk } from './redux/players-reducer';
import { getCalendarThunk } from './redux/calendar-reducer';
import { setRatingThunk } from './redux/rating-reducer';
import { getFullStoryThunk } from './redux/fullStory-reducer';
import { getAllSeasonsThunk } from './redux/ui-reducer';

const Layout = props => {
  useEffect(() => {
    props.setPlayersThunk();
    props.setGamesThunk();
    props.getAllSeasonsThunk();
  }, []);

  let reloadFunc;
  switch (useLocation().pathname) {
    case `/`:
      reloadFunc = props.setRatingThunk;
      break;
    case `/fullStory`:
      reloadFunc = props.getFullStoryThunk;
      break;
    case `/calendar`:
      reloadFunc = props.getCalendarThunk;
      break;
  }

  return (
    <div className="app-wrapper">
      <Header reloadFunc={reloadFunc} />
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
};

export default connect(
  null,
  {
    setPlayersThunk,
    setGamesThunk,
    getCalendarThunk,
    setRatingThunk,
    getFullStoryThunk,
    getAllSeasonsThunk,
  },
)(Layout);
