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

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.scss";

function App(props) {
  const [ticked, setTicked] = useState(false);
  const updateTick = (newTick) => {
    setTicked(newTick);
  };

  return (
    <>
      <div className="App">
        <TranslationQuote />
      </div>
    </>
  );
}

export default App;
