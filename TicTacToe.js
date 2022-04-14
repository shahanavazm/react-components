import { useState } from "react";

// checks if all moves are completed.
function isAllClicked(boardState) {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (boardState[i][j] === "_") {
        return false;
      }
    }
  }
  return true;
}

// checks if currPlayer made a winning move.
// x, y are the indices of the current move.
function hasWon(x, y, boardState, currPlayer) {
  // from: https://stackoverflow.com/a/1058804
  let col, row, diag, rdiag;
  col = row = diag = rdiag = 0;
  const n = 3;
  for (let i = 0; i < n; i += 1) {
    if (boardState[x][i] === currPlayer) row += 1;
    if (boardState[i][y] === currPlayer) col += 1;
    if (boardState[i][i] === currPlayer) diag += 1;
    if (boardState[i][n - i - 1] === currPlayer) rdiag += 1;
    if (row === n || col === n || diag === n || rdiag === n) {
      return true;
    }
  }
  return false;
}

function TicTacToeLcl() {
  const initialBoardState = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"],
  ];
  const [boardState, setBoardState] = useState(initialBoardState);
  const [currPlayer, setCurrPlayer] = useState("x");
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [message, setMessage] = useState("");

  function DisplayBoard() {
    const board = [];
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        function handleOnClick() {
          const newState = boardState.map((row) => row.slice());
          newState[i][j] = currPlayer;
          const nextPlayer = currPlayer === "o" ? "x" : "o";
          setBoardState(newState);
          if (hasWon(i, j, newState, currPlayer)) {
            setIsGameEnded(true);
            setMessage(`Player ${currPlayer} won.`);
            return;
          }
          if (isAllClicked(newState)) {
            setIsGameEnded(true);
            setMessage("Game ended in a draw.");
            return;
          }
          setCurrPlayer(nextPlayer);
        }

        let disabled = boardState[i][j] === "_" ? false : true;
        disabled = isGameEnded ? true : disabled;
        const button = (
          <button disabled={disabled} onClick={handleOnClick} key={"" + i + j}>
            {boardState[i][j]}
          </button>
        );
        board.push(button);
      }
    }
    return <>{board}</>;
  }

  const style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    width: 100,
    height: 100,
  };
  return (
    <>
      <div style={style}>
        <DisplayBoard />
      </div>
      {message}
    </>
  );
}

function TicTacToe() {
  return <TicTacToeLcl />;
}

export default TicTacToe;
