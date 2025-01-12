export const getBotMove = (board) => {
  const bot = "O";
  const user = "X";

  // Check for a winner
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
        return board[a]; // Return the winner ('X' or 'O')
      }
    }

    if (board.every((square) => square !== null)) {
      return "Draw"; // All squares filled, it's a draw
    }

    return null; // No winner yet
  };

  // Minimax function
  const minimax = (board, isMaximizing) => {
    const winner = checkWinner(board);

    // Base cases
    if (winner === bot) return { score: 10 };
    if (winner === user) return { score: -10 };
    if (winner === "Draw") return { score: 0 };

    // Maximizing bot's turn
    if (isMaximizing) {
      let bestScore = -Infinity;
      let bestMove = null;

      board.forEach((square, index) => {
        if (square === null) {
          board[index] = bot; // Make the move
          const { score } = minimax(board, false); // Recursively call minimax
          board[index] = null; // Undo the move
          if (score > bestScore) {
            bestScore = score;
            bestMove = index;
          }
        }
      });

      return { score: bestScore, move: bestMove };
    }

    // Minimizing user's turn
    let bestScore = Number.POSITIVE_INFINITY;
    let bestMove = null;

    board.forEach((square, index) => {
      if (square === null) {
        board[index] = user; // Make the move
        const { score } = minimax(board, true); // Recursively call minimax
        board[index] = null; // Undo the move
        if (score < bestScore) {
          bestScore = score;
          bestMove = index;
        }
      }
    });

    return { score: bestScore, move: bestMove };
  };

  // Get the best move for the bot
  const { move } = minimax(board, true);
  return move;
};
