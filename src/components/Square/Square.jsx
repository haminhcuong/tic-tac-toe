import React from "react";
import "./Square.css";

function Square({ isWinner, value, onClick }) {
  var style = value === "O" ? "O" : "X";

  if (isWinner) {
    style += " winner";
  }

  return (
    <div className="Square">
      <button className={style} onClick={onClick}>
        {value}
      </button>
    </div>
  );
}

export default Square;
