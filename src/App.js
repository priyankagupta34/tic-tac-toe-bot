import React, { useState } from "react";
import Board from "./Board";
import { getBotMove } from "./BotLogic";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    if (board.every((square) => square !== null)) {
      return "Draw";
    }

    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !isUserTurn) return;

    const newBoard = board.slice();
    newBoard[index] = "X";
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result);
    } else {
      setIsUserTurn(false);
      botMove(newBoard);
    }
  };

  const botMove = (currentBoard) => {
    setTimeout(() => {
      const move = getBotMove(currentBoard);
      const newBoard = currentBoard.slice();
      newBoard[move] = "O";

      setBoard(newBoard);

      const result = checkWinner(newBoard);
      if (result) {
        setWinner(result);
      } else {
        setIsUserTurn(true);
      }
    }, 500); // Delay to simulate bot thinking
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsUserTurn(true);
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      {winner ? (
        <h2>
          {winner === "Draw" ? "It's a Draw!" : `${winner} Wins!`}
        </h2>
      ) : (
        <h2>{isUserTurn ? "Your Turn" : "Bot's Turn"}</h2>
      )}
      <Board board={board} onClick={handleClick} />
      {winner && <button onClick={resetGame}>Restart</button>}
    </div>
  );
};

export default App;
