const label = document.querySelector('.winner-label');

let winner;
let gameData;
let isXNext;
let turnCounter;

function initialState() {
  clearBoard();
  winner = null;
  isXNext = true;
  turnCounter = 0;
  gameData = {
    rows: [0, 0, 0],
    cols: [0, 0, 0],
    diag: [0, 0],
  };
}

function clearBoard() {
  const grid = document.querySelector('.board__grid');
  for (let node of grid.children) {
    node.textContent = '';
  }
}

const figures = {
  X: 'X',
  O: 'O',
};

const draw = ({ node, figure }) => {
  if (figure === figures.X) {
    const cross = document.createElement('div');
    const left = document.createElement('div');
    const right = document.createElement('div');

    cross.className = 'cross';
    left.className = 'cross__left';
    right.className = 'cross__right';

    left.appendChild(document.createElement('div'));
    right.appendChild(document.createElement('div'));

    cross.appendChild(left);
    cross.appendChild(right);
    node.appendChild(cross);
  } else {
    const circle = document.createElement('div');
    circle.className = 'circle';
    node.appendChild(circle);
  }
};

const handleOnClick = ({ row, col, id }) => {
  const button = document.getElementById(id);
  const value = isXNext ? figures.X : figures.O;

  if (!button.value && !winner && turnCounter < 9) {
    button.value = value;
    draw({ node: button, figure: value });
    // value 1 for "X", -1 for "O"
    if (currentPlayerWins({ row, col, value: isXNext ? 1 : -1 })) {
      label.textContent = `El ganador es: ${value}`;
      winner = true;
      return;
    }
    isXNext = !isXNext;
    turnCounter++;
  }
  //Drawn when there is no more available turns and nobody has won.
  if (turnCounter >= 9) {
    label.textContent = 'Drawn!';
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
