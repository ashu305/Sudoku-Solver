export const generateSolvedBoard = (unsolvedBoard: number[][], showSteps: boolean): number[][] => {
  let baord = [...unsolvedBoard];
  console.log("Generate Board funbction: ", baord, unsolvedBoard);

  let solvedBaord = solveSoduku(baord, showSteps);
  if (solvedBaord === null) return [];
  return solvedBaord as number[][];
};

const getEmptyLocation = (board: number[][]): number[] => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return [row, col];
      }
    }
  }
  return [-1, -1];
};

export const isValid = (board: number[][], num: number, row: number, col: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && col !== i) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num && row !== i) {
      return false;
    }
  }

  let boxRowStart = Math.floor(row / 3) * 3;
  let boxColStart = Math.floor(col / 3) * 3;

  for (let i = boxRowStart; i < boxRowStart + 3; i++) {
    for (let j = boxColStart; j < boxColStart + 3; j++) {
      if (board[i][j] === num && !(i === row && j === col)) {
        return false;
      }
    }
  }

  return true;
};

export const solveSoduku = (board: number[][], showSteps: boolean): number[][] | null => {
  let row, col;
  row = getEmptyLocation(board)[0];
  col = getEmptyLocation(board)[1];
  if (row === -1) {
    return board;
  }

  for (let i = 1; i <= 9; i++) {
    if (isValid(board, i, row, col)) {
      board[row][col] = i;

      if (solveSoduku(board, showSteps) !== null) {
        return board;
      }
      board[row][col] = 0;
    }
  }

  return null;
};

const sleep = (ms: number) => {
  const start = new Date().getTime();
  while (new Date().getTime() < start + ms) {
    // do nothing
  }
};
