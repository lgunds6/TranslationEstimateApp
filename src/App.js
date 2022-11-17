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
import PDFView from "./components/PDFView.js";
import { PDFViewer } from "@react-pdf/renderer";
import { UseProvider } from "./components/UserContext.js";

function App(props) {
  const [ticked, setTicked] = useState(false);
  const updateTick = (newTick) => {
    setTicked(newTick);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TranslationQuote
          updateTick={updateTick}
          ticked={ticked}
        ></TranslationQuote>
      </header>
    </div>
  );
}

export default App;
