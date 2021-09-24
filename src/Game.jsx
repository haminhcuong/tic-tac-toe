import Board from "./components/Board/Board";
import "./Game.css";
import { useState } from "react";

class Player {
  constructor(value, row, column) {
    this.value = value;
    this.row = row;
    this.column = column;
  }
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [sort, setSort] = useState(false);
  const line = calculateLine(history[stepNumber]);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  const [historyPlayer, setHistoryPlayer] = useState([]);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const squares = [...historyPoint[stepNumber]];

    if (winner || squares[i]) {
      return;
    }
    const historyPlayerPoint = historyPlayer.slice(0, stepNumber);
    const player = new Player(
      xO,
      i < 3 ? 1 : i < 6 ? 2 : 3,
      i < 3 ? i + 1 : (i % 3) + 1
    );
    setHistoryPlayer([...historyPlayerPoint, player]);

    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const renderMoves = history.map((_step, move) => {
    var player = new Player();
    for (var i = 0; i < historyPlayer.length; i++) {
      if (i === move - 1) {
        player = historyPlayer[i];
      }
    }

    var destination = `Go to move ${move} ; ${player.value}(${player.row},${player.column})`;
    if (move === 0) {
      destination = "Go to move 0";
    }
    const styleCurrent = move === stepNumber ? "current" : "";

    return (
      <li key={move}>
        <button
          className={styleCurrent}
          onClick={() => jumpTo(move)}
        >{`${destination}`}</button>
      </li>
    );
  });

  const renderMovesReverse = history
    .map((_step, move) => {
      var player = new Player();
      for (var i = 0; i < historyPlayer.length; i++) {
        if (i === move - 1) {
          player = historyPlayer[i];
        }
      }

      var destination = `Go to move ${move} ; ${player.value}(${player.row},${player.column})`;
      if (move === 0) {
        destination = "Go to move 0";
      }
      const styleCurrent = move === stepNumber ? "current" : "";

      return (
        <li key={move}>
          <button
            className={styleCurrent}
            onClick={() => jumpTo(move)}
          >{`${destination}`}</button>
        </li>
      );
    })
    .reverse();

  function restartClick() {
    jumpTo(0);
    setHistory([Array(9).fill(null)]);
    setHistoryPlayer([]);
  }

  function toggleClick() {
    setSort(!sort);
  }

  return (
    <div className="Game">
      <div className="left">
        <h3>
          {winner
            ? "Winner: " + winner
            : stepNumber === 9
            ? "Tie"
            : "Next Player: " + xO}
        </h3>
      </div>
      <div className="center">
        <h1>TIC TAC TOE</h1>
        <Board
          line={line}
          squares={history[stepNumber]}
          onClick={handleClick}
        />
        <button className="restartBtn" onClick={restartClick}>
          New Game
        </button>
      </div>
      <div className="right">
        <h3>History</h3>
        <button className="sortBtn" onClick={toggleClick}>
          {sort ? "Ascending" : "Descending"}
        </button>
        <div className="table">{sort ? renderMovesReverse : renderMoves}</div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function calculateLine(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
}

export default Game;
