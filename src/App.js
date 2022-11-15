// import logo from "./logo.svg";
// import "./App.css";

import Checkers from "./Checkers.js";
import TranslationQuote from "./components/TranslationQuote.tsx";
import CustomSelect from "./components/CustomSelect.tsx";
import PDFView from "./components/PDFView.js";
import { PDFViewer } from "@react-pdf/renderer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TranslationQuote></TranslationQuote>
      </header>
    </div>
  );
}

export default App;
