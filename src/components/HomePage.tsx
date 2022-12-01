import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/HomePage.scss";

function HomePage() {
  return (
    <>
      <div className="pageContainer">
        <h3 className="homeInfo">
          Hi, I am aspiring developer. Blah blah blah blah blah blah blah blah
          blah blah blahblah blah blah blah blah
        </h3>

        <span>...</span>

        <button>About me</button>

        <div className="socialsContainer">
          <button> LinkedIn</button>
          <button>GitHub</button>
        </div>
      </div>
    </>
  );
}
export default HomePage;
