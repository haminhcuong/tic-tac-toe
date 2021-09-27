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

  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        isWinner={indexWinner(i)}
        value={squares[i]}
        onClick={() => onClick(i)}
      />
    );
  };

  const gameBoard = [];
  for (let i = 0; i < 3; i++) {
    let list = [];
    for (let j = 0; j < 3; j++) {
      list.push(renderSquare(3 * i + j));
    }

    gameBoard.push(<div className="col">{list}</div>);
  }

  return <div className="Board">{gameBoard}</div>;
}

export default Board;
