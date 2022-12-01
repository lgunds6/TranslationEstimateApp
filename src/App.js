// import logo from "./logo.svg";
// import "./App.css";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useContext,
  createContext,
} from "react";
import Checkers from "./Checkers.js";
import TranslationQuote from "./components/TranslationQuote.tsx";
import CustomSelect from "./components/CustomSelect.tsx";
import HomePage from "./components/HomePage.tsx";
import TestPage from "./components/TestPage.tsx";
import About from "./components/About.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

function App(props) {
  const [ticked, setTicked] = useState(false);
  const updateTick = (newTick) => {
    setTicked(newTick);
  };

  return (
    <>
      <div
        className="App"
        style={{
          backgroundImage: `url(${"https://birchtree.nyc3.digitaloceanspaces.com/images/wwdc18/dev-blue.png"})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="navBarContainer">
          <ul className="home">
            <li className="nameStyle">
              <a href="default.asp">Luke Gunders</a>
            </li>
          </ul>
          <ul className="navBar">
            <li>
              <a href="news.asp">Projects</a>
            </li>
            <li>
              <a href="contact.asp">Contact</a>
            </li>
            <li>
              <a href="about.asp">About</a>
            </li>
          </ul>
        </div>
        <HomePage></HomePage>
      </div>
      <footer>Footoer PlaceHolder</footer>

      {/* <About></About> */}
    </>
  );
}

export default App;
