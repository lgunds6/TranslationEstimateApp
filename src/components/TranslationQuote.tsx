import React, { useState, useEffect, useCallback, useRef } from "react";
// @ts-ignore
import CustomSelect from "./CustomSelect.tsx";
import NativeSelect from "@mui/material/NativeSelect";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from "jspdf";
import "../styles/TransQuote.scss";
import { useUpdateUserContext } from "./UserContext.js";
import { useUserContext } from "./UserContext.js";
import App from "../App.js";

function TranslationQuote(
  { ticked, updateTick, setTicked },
  personName,
  setPersonName,
  props
) {
  const pdfRef = useRef(null);
  const formRef = useRef(null);

  // Data States
  const [subjectData, setSubjectData] = useState([]);
  const [subject, setSubject] = useState("");
  //Words States
  const [totalWords, setTotalWords] = useState<number>();
  const [wordTime, setWordTime] = useState<number>();

  const [totalTime, setTotalTime] = useState<number>();
  // QA states
  const [qaTicked, setQaTicked] = useState(true);
  const [timeWithQA, setTimeWithQA] = useState<number>(0);
  // Client states
  const [clientName, setClientName] = useState("");
  // Description states
  const [description, setDescription] = useState("");
  //TypeSetting States
  const [typeSettingChecked, setTypeSettingChecked] = useState<boolean>(false);
  const [totalTypePages, setTotalTypePages] = useState<number>();
  const [extraTypeTime, setExtraTypeTime] = useState<number>();
  //Date states
  const [date, setDate] = useState(new Date());
  const [newDate, setNewDate] = useState(new Date());
  const [dateArray, setDateArray] = useState([""]);
  //Final Delivery State
  const [finalQuote, setFinalQuote] = useState<number>();
  const [finalQA, setFinalQA] = useState<number>();
  const [finalType, setFinalType] = useState<number>();
  const [finalWord, setFinalWord] = useState<number>();
  const [sourceWord, setSourceWord] = useState<number>();
  const [languageNumber, setLanguageNumber] = useState<number>();
  const [sourcePages, setSourcePages] = useState<number>();
  const [expectedCompletionDate, setExpectedCompletionDate] = useState("");
  const [estimate, setEstimate] = useState<boolean>(false);
  const [client, setClient] = useState("");
  const [projectInfo, setProjectInfo] = useState("");
  const [buttonVal, setButtonVal] = useState("Get estimaate");
  //Language Total State from CustomSelect
  const [totalLanguages, setTotalLanguages] = useState<number>();

  var moment = require("moment-business-days");
  moment.updateLocale("us", {
    workingWeekdays: [1, 2, 3, 4, 5],
  });

  // Fetch Call for Subjuect Data
  const fetchSubjectJSONDataFrom = useCallback(async (path) => {
    const response = await fetch(path, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setSubjectData(data);
  }, []);

  useEffect(() => {
    fetchSubjectJSONDataFrom("data/subjectdata.json");
  }, [fetchSubjectJSONDataFrom]);

  //*** End */

  // Function to handle date selection and states

  const isWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  };

  //Change function to grab prop data from CustomSelect component and update Total Languge render value

  const handleLanguageChange = (data) => {
    let x = data;
    setTotalLanguages(x);
  };

  //*** End */

  // Word count functions to handle input value and calcualte days

  const wordCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTotalWords(parseInt(value));
  };

  useEffect(() => {
    if (totalWords) {
      let x = totalWords / 1000;
      if (x % 1 !== 0) {
        setWordTime(Math.trunc(x) + 1);
      } else {
        setWordTime(Math.trunc(x));
      }
    }
  });

  //*** End */

  // TypSetting ticked and functions to handle page count and calculations

  function checkTypeSetting() {
    if (typeSettingChecked === false) {
      setTypeSettingChecked(true);
    } else {
      setTypeSettingChecked(false);
    }
  }
  const pageCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let pageValue = e.target.value;
    setTotalTypePages(parseInt(pageValue));
  };

  useEffect(() => {
    if (typeSettingChecked === true) {
      let x = totalTypePages / 10;
      if (x % 1 !== 0) {
        setExtraTypeTime(Math.trunc(x) + 1);
      } else {
        setExtraTypeTime(Math.trunc(x));
      }
    } else {
      setExtraTypeTime(0);
    }
  });

  //*** End */

  // If QA ticked functions to handle boolean state

  function qaChecked() {
    if (qaTicked === false) {
      setQaTicked(true);
    } else {
      setQaTicked(false);
    }
  }
  useEffect(() => {
    if (qaTicked === true) {
      let x = wordTime * 0.5;
      setTimeWithQA(x);
      setTotalTime(x + wordTime);
    } else {
      let y = 0;
      setTimeWithQA(y);
      setTotalTime(wordTime);
    }
  });

  //*** End */

  // Function to handle client name state

  const nameChange = (e) => {
    setClientName(e.target.value);
  };

  //*** End */

  // Function to handle description state

  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };

  //*** End */

  // Function to handle onSubmit that calculates fina; delivery time frame using already calculated totalTime value and adding on QA time

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (totalWords) {
      if (btn.innerText == "Get estimate") {
        btn.innerText = "Update";
      }
    }

    if (timeWithQA) {
      setFinalQA(timeWithQA);
      setSourceWord(totalWords);
      setLanguageNumber(totalLanguages);
    } else {
      setFinalQA(0);
    }
    if (extraTypeTime) {
      setFinalType(extraTypeTime);
      setLanguageNumber(totalLanguages);
      setSourcePages(totalTypePages);
    } else {
      setFinalType(0);
    }
    if (wordTime) {
      setFinalWord(wordTime);
      setEstimate(true);
      setLanguageNumber(totalLanguages);
      setSourceWord(totalWords);
    } else {
      setFinalWord(0);
    }
    if (clientName) {
      setClient(clientName);
      setProjectInfo(description);
    } else {
      setClient("");
    }

    if (typeSettingChecked === true) {
      setFinalQuote(totalTime + extraTypeTime);
    } else {
      setFinalQuote(totalTime);
    }
  };
  useEffect(() => {
    if (finalQuote) {
      let momentDate = moment(date, "DD-MM-YYYY")
        .businessAdd(totalTime + extraTypeTime)
        .format("DD-MM-YYYY");

      setExpectedCompletionDate(momentDate);
    }
  });

  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF();
    doc.html(content, {
      callback: function (doc) {
        doc.save(clientName + "-" + date + "estimate.pdf");
      },
      html2canvas: { scale: 0.23 },
    });
  };

  //*** End */

  function handleSubmit2() {
    // window.location.reload(false);
    setTotalWords(0);
    setClientName("");
    setDescription("");
    setTypeSettingChecked(false);
    setTotalTypePages(0);
    setDate(new Date());
    if (totalWords) {
      if (btn.innerText == "Update") {
        btn.innerText = "Get estimate";
      }
    }

    setEstimate(false);
    if (ticked === false) {
      updateTick(true);

      console.log("hi", ticked);
    }
  }

  return (
    <>
      <div className="bodyContainer">
        <h1 className="headerStyles"> Get an estimated delivery timeframe</h1>
        <form
          name="myForm"
          className="formContainer"
          onSubmit={handleOnSubmit}
          id="myform"
        >
          <h2 className="formHeader"> Project requirements</h2>
          <div className="formRowOne">
            <div className="clientName">
              <label>Client name</label>
              <input
                value={clientName}
                type="text"
                onChange={nameChange}
              ></input>
            </div>
            <div className="languageCount">
              <label className="languageLabel">
                Translate into ({totalLanguages})
              </label>
              <CustomSelect
                ticked={ticked}
                updateTick={updateTick}
                className="languageCount"
                onChange={handleLanguageChange}
              />
            </div>
          </div>

          <div className="formRowTwo">
            <div className="projectDescription">
              <label>Project description</label>
              <textarea
                value={description}
                onChange={descriptionChange}
              ></textarea>
            </div>
            <div className="wordCount">
              <label>Source word count</label>
              <input
                value={totalWords}
                type="number"
                onChange={wordCount}
              ></input>
            </div>
            <div className="wordCount">
              <label>Project start date</label>
              <div>
                <DatePicker
                  selected={date}
                  setStaretDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  filterDate={isWeekday}
                  onChange={(date) => setDate(date)}
                />
              </div>
            </div>
            <div className="qaStyles">
              <label>
                <input
                  checked={qaTicked}
                  type="checkbox"
                  onChange={qaChecked}
                ></input>
                Do you need independent checking?
              </label>
            </div>
            <div className="typeStyles">
              <label>
                <input
                  checked={typeSettingChecked}
                  type="checkbox"
                  onChange={checkTypeSetting}
                ></input>
                Do you need typesetting?
              </label>
            </div>
            {typeSettingChecked === true && (
              <div className="pageCount">
                <label>How many source pages?</label>
                <input
                  value={totalTypePages}
                  type="number"
                  className="pageInput"
                  onChange={pageCount}
                ></input>
              </div>
            )}
          </div>

          <div className="buttonStyles">
            <button id="btn" name="btn1" value="Get estimate" type="submit">
              {" "}
              Get estimate
            </button>
          </div>
          {estimate === true && (
            <div className="buttonStylesReset">
              <button type="button" onClick={handleSubmit2}>
                {" "}
                Reset
              </button>
            </div>
          )}
          {estimate === true && (
            <>
              <div ref={pdfRef}>
                <h2 className="formHeader"> Estimated delivery</h2>
                {client !== "" && (
                  <>
                    <p className="clientNameDisplay">{client}</p>
                    <p className="projectInfo"> {projectInfo} </p>
                  </>
                )}
                <div className="quoteContainer">
                  <label className="HeaderColumn">Service</label>
                  <label className="HeaderColumnTwo">Days</label>

                  {finalWord !== 0 && (
                    <>
                      <p>
                        {" "}
                        Translation ({languageNumber} languages / {sourceWord}{" "}
                        source words){" "}
                      </p>
                      <p className="columnTwo"> {finalWord} </p>
                    </>
                  )}
                  {finalQA !== 0 && (
                    <>
                      <p>
                        {" "}
                        Independent checking ({languageNumber} languages /{" "}
                        {sourceWord} source words){" "}
                      </p>{" "}
                      <p className="columnTwo"> {finalQA} </p>{" "}
                    </>
                  )}

                  {finalType !== 0 && (
                    <>
                      <p>
                        Typesetting ({languageNumber} languages / {sourcePages}{" "}
                        source pages){" "}
                      </p>
                      <p className="columnTwo">{finalType} </p>{" "}
                    </>
                  )}

                  {finalQuote && (
                    <>
                      <p className="totalStyle"> Total delivery time: </p>
                      <p className="totalStyleTwo"> {finalQuote} Days </p>
                      <p className="totalStyle"> Expected delivery date: </p>
                      <p className="totalStyleTwo">
                        {" "}
                        {expectedCompletionDate}{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <button className="btnDownload" onClick={handleDownload}>
                Download
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}
export default TranslationQuote;
