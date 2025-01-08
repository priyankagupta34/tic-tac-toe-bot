export const getBotMove = (board) => {
    // Simple logic: pick the first available square
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        return i;
      }
    }
    return null;
  };
  