const figures = {
  X: 'X',
  O: 'O',
};

let winner;
let gameData;
let isXNext;
let turnCounter;

function initialState() {
  clearBoard();
  winnerLabel.style = 'display:none';
  drawTurnLabel('X');
  winner = null;
  isXNext = true;
  turnCounter = 0;
  gameData = {
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diag: [0, 0],
  };
}

const handleOnClick = ({ row, col }) => {
  const button = document.getElementById(`${row}${col}`);
  const value = isXNext ? figures.X : figures.O;

  if (!button.value && !winner && turnCounter < 9) {
    drawTurnLabel(value);
    button.value = value;
    drawFigure({ node: button, figure: value });
    // value 1 for "X", -1 for "O"
    if (currentPlayerWins({ row, col, value: isXNext ? 1 : -1 })) {
      winner = true;
      drawWinnerLable(value);
      highLightCells({ row, col });
      return;
    }
    isXNext = !isXNext;
    drawTurnLabel(isXNext ? figures.X : figures.O);
    turnCounter++;
  }
  //Draw when there is no more available turns and nobody has won.
  if (turnCounter >= 9) {
    drawWinnerLable();
  }
};

const currentPlayerWins = ({ row, col, value }) => {
  const { rows, cols, diag } = gameData;
  /*Based on the cell's position on the grid, increment (for "X" player) or decrement (for "O" player) 
  the value at the corresponding index for each array (rows, cols and diag)*/
  rows[row] += value;
  cols[col] += value;
  if (col == row) diag[0] += value;
  if (row == 2 - col) diag[1] += value;

  /*Cheks if the current player has 3 marks on a row, colum or diagonal. If that's so, wins*/
  return (
    Math.abs(rows[row]) === 3 ||
    Math.abs(cols[col]) == 3 ||
    Math.abs(diag[0]) === 3 ||
    Math.abs(diag[1]) === 3
  );
};

initialState();
