import React, { useState } from "react";
import "./App.css";

function App() {
  const [char, setChar] = useState("X");
  const [winner, setWinner] = useState("");
  const [matrix, setMatrix] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const reset=()=>{
    setChar("X");
    setWinner("");
    setMatrix([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ]);
  }

  const ColorChanger = (value) => {
    if (value === "X") return "gray";
    if (value === "O") return "ash";
    return "";
  };

  const winnerChecker = () => {
    // Rows
    let flag=false;
    for (let i = 0; i < 3; i++) {
      if (matrix[i][0] !== "" && matrix[i][0] === matrix[i][1] && matrix[i][1] === matrix[i][2]) {
        setWinner(`${matrix[i][0]} is the winner`);
        flag=true;
      }
    }

    // Columns
    for (let i = 0; i < 3; i++) {
      if (matrix[0][i] !== "" && matrix[0][i] === matrix[1][i] && matrix[1][i] === matrix[2][i]) {
        setWinner(`${matrix[0][i]} is the winner`);
        flag=true;
      }
    }

    // Diagonals
    if (matrix[0][0] !== "" && matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2]) {
      setWinner(`${matrix[0][0]} is the winner`);
      flag=true;
    }
    if (matrix[0][2] !== "" && matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0]) {
      setWinner(`${matrix[0][2]} is the winner`);
      flag=true;
    }
    if(flag){
      setTimeout(
        ()=>{
         reset()
        },10000
    );
    }
  };

  const handler = (r, c) => {
    if (matrix[r][c] !== "" || winner) return; // Prevent overriding and playing after a win

    const tempMatrix = [...matrix];
    tempMatrix[r][c] = char;
    setMatrix(tempMatrix);
    setChar(char === "X" ? "O" : "X");

    winnerChecker();
  };

  return (
    <div className="app">
      <div className="Header alignCenter">TIC TAC TOE</div>
      <div className="alignCenter board">
        {winner ? <h2>{winner}</h2> : <h3>Next Turn: {char}</h3>}
        <div className="gameBoard">
          {matrix.map((row, rIndex) => (
            <div key={rIndex} className="row">
              {row.map((cell, cIndex) => (
                <div
                  key={cIndex}
                  onClick={() => handler(rIndex, cIndex)}
                  className={`cell alignCenter ${ColorChanger(matrix[rIndex][cIndex])}`}
                >
                  {matrix[rIndex][cIndex]}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setMatrix([
              ["", "", ""],
              ["", "", ""],
              ["", "", ""],
            ]);
            setWinner("");
            setChar("X");
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

export default App;