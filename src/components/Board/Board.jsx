import React from "react";
import "./Board.css";
import Square from "../Square/Square.jsx";

function Board({ line, squares, onClick }) {
  function indexWinner(i) {
    if (line !== null) {
      for (var j = 0; j < 3; j++) {
        if (i === line[j]) {
          return true;
        }
      }
    }

    return false;
  }

  return (
    <div className="Board">
      {squares.map((square, i) => (
        <Square
          isWinner={indexWinner(i)}
          key={i}
          value={square}
          onClick={() => onClick(i)}
        />
      ))}
    </div>
  );
}

export default Board;
