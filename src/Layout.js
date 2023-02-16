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

    /**
     * Такие кусочки кода можно выносить в отдельные хуки, и как нибудь более читаемо называть
     * Например если здесь фетчятся данные для инициализации, то назвать хук useInitializer()
     */
  useEffect(() => {
    props.setPlayersThunk();
    props.setGamesThunk();
    props.getAllSeasonsThunk();
  }, []);

    /**
     *  можно завернуть в useMemo
     *  и вместо switch case можно использовать объект типа
     *  const funcByPathnameMap: Record<'/' | '/fullStory' | '/calendar', () => void> = {
     *      '/': props.setRatingThunk,
     *      '/fullStory': props.getFullStoryThunk,
     *      '/calendar': props.getCalendarThunk,
     *  };
     *  const location = useLocation();
     *  const reloadFunc = funcByPathnameMap[location.pathname];
     *
     *  особенно хорошо такие объекты заводить c тайпскриптом, потому что
     *  если добавится какой нибудь новый роут, то всплывет подсказка что в этом мапе нужно его обработать
     */
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

    /**
     *  эту логику обычно разделяют на 2 компонента
     *  - <App/> - для роутов и общих настроек
     *  - <Page/> - там уже прописывают layout (хедер, футер и тп)
     */
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
