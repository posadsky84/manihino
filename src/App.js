import './App.css';
import Header from "./components/header/header";
import Subheader from "./components/subheader/subheader";
import Footer from "./components/footer/footer";
import PageMain from "./components/PageMain/pagemain";

const App = () => {
  return (
    <div className="app-wrapper">

      <Header />
      <Subheader />
      <PageMain />
      <Footer />

    </div>
  );
}

export default App;
