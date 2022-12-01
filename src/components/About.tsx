import React, { useState, useEffect, useCallback, useRef } from "react";
import "../styles/About.scss";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function About() {
  const Image1 = () => (
    <img
      src="https://media.istockphoto.com/id/1309040743/photo/travel-planning-background.jpg?b=1&s=170667a&w=0&k=20&c=oYsf4vJ1lCmKJAwq1DAIte1KH56qCmiyNDvoysDHUhQ="
      className="gallery__img"
      alt="travel"
    />
  );
  const Image2 = () => (
    <div className="travelInfo">
      <p>
        {" "}
        I love to travel and it is something that brings me so much joy. One of
        my very favourite spots to visit is Boracay in the Philippines
      </p>
    </div>
  );
  const Image3 = () => (
    <img
      src="data:image/jpeg;base64,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"
      className="gallery__img"
      alt="Imag of dog"
    />
  );
  const Image4 = () => (
    <div className="travelInfo">
      <p>
        {" "}
        Pablo is my 2 year old minature daschund. We have a weekend tradition
        where we wake up early, grab a coffee and spend half the morning down at
        the local dog park.
      </p>
    </div>
  );
  const Image8 = () => (
    <img
      src="https://thumbs.dreamstime.com/b/swimming-pool-26526712.jpg"
      className="gallery__img"
      alt="Imag"
    />
  );

  const Image5 = () => (
    <div className="travelInfo">
      <p>
        {" "}
        I love swimming. Whether its jumping off a boat and exploring a reef out
        in the ocean, or swimming laps at the local pool. Swimming is one of my
        favourite exercises.
      </p>
    </div>
  );
  const Image9 = () => (
    <img
      src="https://thumbs.dreamstime.com/b/swimming-pool-26526712.jpg"
      className="gallery__img"
      alt="Imag"
    />
  );

  const Image7 = () => (
    <div className="travelInfo">
      <p>
        {" "}
        I love swimming. Whether its jumping off a boat and exploring a reef out
        in the ocean, or swimming laps at the local pool. Swimming is one of my
        favourite exercises.
      </p>
    </div>
  );

  return (
    <>
      <div className="pageContainer">
        <div className="introStyle">
          <h3>Personal Life</h3>
          <span>...</span>
        </div>
        <div className="imageContainer">
          <Image1 />
          <Image2 />
          <Image3 />
          <Image4 />
          <Image5 />
          <Image8 />
          <Image7 />
          <Image9 />
        </div>
        <div className="summaryContainer">
          <div className="introStyleSummary">
            <h3>Professional Summary</h3>
            <span>...</span>

            <p className="summaryStyles">
              I am an accomplished professional with 7 years of experience
              working for Alinta Energy and Origin Energy in a variety of
              Analyst roles. Whilst working as a Change Management Analyst, I
              had the opportunity to work on software development projects.
              Based on this experience, I decided to embark on a career change,
              enrolling in a course to enable me to work as a Junior Software
              Developer. In February 2022, I graduated with a Diploma of
              Information Technology from Coder Academy (Academy of Information
              Technology), with a focus on software development.  I then
              obtained a position at Clear Dynamics working as a CX Delivery
              Engineer, with a focus on front-end development. I also undertook
              and currently hold a AGSVA Baseline security clearance. I am
              currently looking for a new role as a Junior Software Developer,
              focusing on front-end development where I can continue to learn
              and grow.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default About;
