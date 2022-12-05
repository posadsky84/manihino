import './App.css';
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import PageMain from "./components/PageMain/pagemain";
import { Route, Routes } from 'react-router-dom';
import PageFullStory from "./components/PageFullStory/pageFullStoryAPI";

const App = () => {
  return (

    <div className="app-wrapper">
      <Header/>
      <div className="main-area">
        <Routes>
          <Route element={<PageMain/>} path="/"/>
          <Route element={<PageFullStory/>} path="/fullStory"/>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
