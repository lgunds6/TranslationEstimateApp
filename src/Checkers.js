import React from "react";

import "./styles/Checkers.scss";

function Checkers() {
  /*--------- Game State Data ----------*/
  const board = [
    null,
    0,
    null,
    1,
    null,
    2,
    null,
    3,
    4,
    null,
    5,
    null,
    6,
    null,
    7,
    null,
    null,
    8,
    null,
    9,
    null,
    10,
    null,
    11,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    12,
    null,
    13,
    null,
    14,
    null,
    15,
    null,
    null,
    16,
    null,
    17,
    null,
    18,
    null,
    19,
    20,
    null,
    21,
    null,
    22,
    null,
    23,
    null,
  ];

  // DOM references
  const cells = document.querySelectorAll("td");
  let redsPieces = document.querySelectorAll("p");
  let blacksPieces = document.querySelectorAll("span");
  const redTurnText = document.querySelectorAll(".redTurnText");
  const blackTurnText = document.querySelectorAll(".blackTurnText");
  const divider = document.querySelectorAll("#divider");

  let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
  };

  //player properties

  let turn = true;
  let redScore = 12;
  let blackScore = 12;
  let playerPieces;

  let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false,
  };

  // initialize event listeners on pieces

  function givePiecesEventListeners() {
    if (turn) {
      for (let i = 0; i < redsPieces.length; i++) {
        redsPieces[i].addEventListener("click", getPlayerPieces);
      }
    } else {
      for (let i = 0; i < blacksPieces.length; i++) {
        blacksPieces[i].addEventListener("click", getPlayerPieces);
      }
    }
  }

  // removes onclick attribute from current selected cell
  function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
      cells[i].removeAttribute("onclick");
    }
  }

  //resetBorders

  function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
      playerPieces[i].style.border = "1px solid white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
  }

  // resets selected piece properties

  function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.indexOfBoardPiece = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
  }

  // gets ID and index of the board cell its on

  function getSelectedPiece(e) {
    // eslint-disable-next-line no-restricted-globals
    selectedPiece.pieceId = parseInt(e.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
  }

  //checks if selected piece is a king

  function isPieceKing() {
    if (
      document.getElementById(selectedPiece.pieceId).classList.contains("king")
    ) {
      selectedPiece.isKing = true;
    } else {
      selectedPiece.isKing = false;
    }
    getAvailableSpaces();
  }

  // get available spaces for selected piece to move

  function getAvailableSpaces() {
    if (
      board[selectedPiece.indexOfBoardPiece + 7] === null &&
      cells[selectedPiece.indexOfBoardPiece + 7].classList.contains(
        "noPieceHere"
      ) !== true
    ) {
      selectedPiece.seventhSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece + 9] === null &&
      cells[selectedPiece.indexOfBoardPiece + 9].classList.contains(
        "noPieceHere"
      ) !== true
    ) {
      selectedPiece.ninthSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 7] === null &&
      cells[selectedPiece.indexOfBoardPiece - 7].classList.contains(
        "noPieceHere"
      ) !== true
    ) {
      selectedPiece.minusSeventhSpace = true;
    }
    if (
      board[selectedPiece.indexOfBoardPiece - 9] === null &&
      cells[selectedPiece.indexOfBoardPiece - 9].classList.contains(
        "noPieceHere"
      ) !== true
    ) {
      selectedPiece.minusNinthSpace = true;
    }
    checkAvailableJumpSpaces();
  }

  // check if selected piece can jump spaces
  function checkAvailableJumpSpaces() {
    if (turn) {
      if (
        board[selectedPiece.indexOfBoardPiece + 14] === null &&
        cells[selectedPiece.indexOfBoardPiece + 14].classList.contains(
          "noPieceHere"
        ) !== true &&
        board[selectedPiece.indexOfBoardPiece + 7] >= 12
      ) {
        selectedPiece.fourteenthSpace = true;
      } else {
        if (
          board[selectedPiece.indexOfBoardPiece + 14] === null &&
          cells[selectedPiece.indexOfBoardPiece + 14].classList.contains(
            "noPieceHere"
          ) !== true &&
          board[selectedPiece.indexOfBoardPiece + 7] < 12 &&
          board[selectedPiece.indexOfBoardPiece + 7] !== null
        ) {
          selectedPiece.fourteenthSpace = true;
        }
        checkPieceCondition();
      }
    }
  }

  // restrics movement if the piece is a king

  function checkPieceCondition() {
    if (selectedPiece.isKing) {
      givePieceBorder();
    } else {
      if (turn) {
        selectedPiece.minusSeventhSpace = false;
        selectedPiece.minusNinthSpace = false;
        selectedPiece.minusFourteenthSpace = false;
        selectedPiece.minusEighteenthSpace = false;
      } else {
        selectedPiece.seventhSpace = false;
        selectedPiece.ninthSpace = false;
        selectedPiece.fourteenthSpace = false;
        selectedPiece.eighteenthSpace = false;
      }
      givePieceBorder();
    }
  }

  // gives the piece a green highlight for the user (showing its moveable)

  function givePieceBorder() {
    if (
      selectedPiece.seventhSpace ||
      selectedPiece.ninthSpace ||
      selectedPiece.fourteenthSpace ||
      selectedPiece.eighteenthSpace ||
      selectedPiece.minusSeventhSpace ||
      selectedPiece.minusNinthSpace ||
      selectedPiece.minusFourteenthSpace ||
      selectedPiece.minusEighteenthSpace
    ) {
      document.getElementById(selectedPiece.pieceId).style.border =
        "3px solid green";
      giveCellsClick();
    } else {
      return;
    }
  }

  //

  function giveCellsClick() {
    if (selectedPiece.seventhSpace) {
      cells[selectedPiece.indexOfBoardPiece + 7].setAttribute(
        "onclick",
        "makeMove(7)"
      );
    }
    if (selectedPiece.ninthSpace) {
      cells[selectedPiece.indexOfBoardPiece + 9].setAttribute(
        "onclick",
        "makeMove(9)"
      );
    }
    if (selectedPiece.fourteenthSpace) {
      cells[selectedPiece.indexOfBoardPiece + 14].setAttribute(
        "onclick",
        "makeMove(14)"
      );
    }
    if (selectedPiece.eighteenthSpace) {
      cells[selectedPiece.indexOfBoardPiece + 18].setAttribute(
        "onclick",
        "makeMove(18)"
      );
    }
    if (selectedPiece.minusSeventhSpace) {
      cells[selectedPiece.indexOfBoardPiece - 7].setAttribute(
        "onclick",
        "makeMove(-7)"
      );
    }
    if (selectedPiece.minusNinthSpace) {
      cells[selectedPiece.indexOfBoardPiece - 9].setAttribute(
        "onclick",
        "makeMove(-9)"
      );
    }
    if (selectedPiece.minusFourteenthSpace) {
      cells[selectedPiece.indexOfBoardPiece - 14].setAttribute(
        "onclick",
        "makeMove(-14)"
      );
    }
    if (selectedPiece.minusEighteenthSpace) {
      cells[selectedPiece.indexOfBoardPiece - 18].setAttribute(
        "onclick",
        "makeMove(-18)"
      );
    }
  }

  function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    cells[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
      if (selectedPiece.isKing) {
        cells[
          selectedPiece.indexOfBoardPiece + number
        ].innerHTML = `<p className={checkers.redPieceKing} id="${selectedPiece.pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
      } else {
        cells[
          selectedPiece.indexOfBoardPiece + number
        ].innerHTML = `<p className="redPiece" id="${selectedPiece.pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
      }
    } else {
      if (selectedPiece.isKing) {
        cells[
          selectedPiece.indexOfBoardPiece + number
        ].innerHTML = `<span className={checkers.redPieceKing} id="${selectedPiece.pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
      } else {
        cells[
          selectedPiece.indexOfBoardPiece + number
        ].innerHTML = `<span className="redPiece" id="${selectedPiece.pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
      }
    }
    let indexOfPiece = selectedPiece.indexOfBoardPiece;
    if (number === 14 || number === -14 || 18 || number === -18) {
      changeData(
        indexOfPiece,
        indexOfPiece + number,
        indexOfPiece + number / 2
      );
    } else {
      changeData(indexOfPiece, indexOfPiece + number);
    }
  }

  // holds the length of the players piece count

  function getPlayerPieces() {
    if (turn) {
      playerPieces = redsPieces;
    } else {
      playerPieces = blacksPieces;
    }
    removeCellonclick();
    resetBorders();
  }

  // changes the board states data on the backend

  function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[indexOfBoardPiece] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
      document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (turn && selectedPiece.pieceId >= 12 && modifiedIndex <= 7) {
      document.getElementById(selectedPiece.pieceId).classList.add("king");
    }

    if (removePiece) {
      board[removePiece] = null;
      if (turn && selectedPiece.pieceId < 12) {
        cells[removePiece].innerHTML = "";
        blackScore--;
      }
      if (turn === false && selectedPiece.pieceId >= 12) {
        cells[removePiece].innerHTML = "";
        redScore--;
      }
    }
    resetSelectedPieceProperties();
    removeCellonclick();
    removeEventListeners();
  }

  // remove the onClick event listeners for pieces

  function removeEventListeners() {
    if (turn) {
      for (let i = 0; i < redsPieces.length; i++) {
        redsPieces[i].removeEventListener("click", getPlayerPieces);
      }
    } else {
      for (let i = 0; i < blacksPieces.length; i++) {
        blacksPieces[i].removeEventListener("click", getPlayerPieces);
      }
    }
    checkForWin();
  }

  // check for win

  function checkForWin() {
    if (blackScore === 0) {
      divider.style.display = "none";
      for (let i = 0; i < redTurnText.length; i++) {
        redTurnText[i].style.color = "black";
        blackTurnText[i].style.display = "none";
        redTurnText[i].textContent = "Red Wins";
      }
    } else if (redScore === 0) {
      divider.style.display = "none";
      for (let i = 0; i < blackTurnText.length; i++) {
        blackTurnText[i].style.color = "black";
        redTurnText[i].style.display = "none";
        blackTurnText[i].textContent = "Black Wins";
      }
    }
    changePlayer();
  }

  // Switch players turn

  function changePlayer() {
    if (turn) {
      turn = false;
      for (let i = 0; i < redTurnText.length; i++) {
        redTurnText[i].style.color = "lightGrey";
        blackTurnText[i].style.color = "black";
      }
    } else {
      turn = true;
      for (let i = 0; i < blackTurnText.length; i++) {
        blackTurnText[i].style.color = "lightGrey";
        redTurnText[i].style.color = "black";
      }
    }
    givePiecesEventListeners();
  }
  givePiecesEventListeners();

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="0"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="1"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              {" "}
              <p className="redPiece" id="2"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              {" "}
              <p className="redPiece" id="3"></p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="redPiece" id="4"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="5"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              {" "}
              <p className="redPiece" id="6"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              {" "}
              <p className="redPiece" id="7"></p>
            </td>
            <td className="noPieceHere"></td>
          </tr>
          <tr>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="8"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="9"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="10"></p>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <p className="redPiece" id="11"></p>
            </td>
          </tr>

          <tr>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
          </tr>
          <tr>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
            <td className="noPieceHere"></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <span className="blackPiece" id="12"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="13"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="14"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="15"></span>
            </td>
            <td className="noPieceHere"></td>
          </tr>
          <tr>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="16"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="17"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="18"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="19"></span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="blackPiece" id="20"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="21"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="22"></span>
            </td>
            <td className="noPieceHere"></td>
            <td>
              <span className="blackPiece" id="23"></span>
            </td>
            <td className="noPieceHere"></td>
          </tr>
        </tbody>
      </table>
      <div className="textContainer">
        <div className="redTurnText"> Reds turn</div>
        <p className="divder" id="divider">
          |
        </p>
        <div className="blackTurnText"> Blacks turn</div>
      </div>
    </>
  );
}
export default Checkers;
