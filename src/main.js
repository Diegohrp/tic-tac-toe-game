const winnerLabel = document.querySelector('.winner-label');
const turnLabel = document.querySelector('.turn-label');
const grid = document.querySelector('.board__grid');

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

function clearBoard() {
  for (let node of grid.children) {
    node.innerHTML = '';
    node.value = '';
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

const drawTurnLabel = (player) => {
  turnLabel.style = 'display:block';
  turnLabel.innerHTML = `It's <span class="${player}">${player}</span>'s turn`;
};

const drawWinnerLable = (player) => {
  turnLabel.innerHTML = '';
  turnLabel.style = 'display:none';
  winnerLabel.style =
    'display:block;animation: winner-label-anim 0.8s ease-in forwards;';
  if (player) {
    winnerLabel.innerHTML = `Player <span class="${player}">${player}</span> Wins!`;
  } else {
    winnerLabel.innerHTML = 'Draw!';
  }
};

const handleOnClick = ({ row, col }) => {
  const button = document.getElementById(`${row}${col}`);
  const value = isXNext ? figures.X : figures.O;

  if (!button.value && !winner && turnCounter < 9) {
    drawTurnLabel(value);
    button.value = value;
    draw({ node: button, figure: value });
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
  //Drawn when there is no more available turns and nobody has won.
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

const highLightCells = ({ row, col }) => {
  const { rows, cols, diag } = gameData;

  if (Math.abs(rows[row]) === 3) {
    for (let node of grid.children) {
      if (node.id.charAt(0) === `${row}`) {
        node.className = 'board__cell--highlight';
      }
    }
    return;
  }

  if (Math.abs(cols[col]) === 3) {
    for (let node of grid.children) {
      if (node.id.charAt(1) === `${col}`) {
        node.className = 'board__cell--highlight';
      }
    }
    return;
  }

  if (Math.abs(diag[0]) === 3) {
    for (let node of grid.children) {
      if (node.id.charAt(0) === node.id.charAt(1)) {
        node.className = 'board__cell--highlight';
      }
    }
    return;
  }

  if (Math.abs(diag[1]) === 3) {
    for (let node of grid.children) {
      if (node.id.charAt(0) === `${2 - parseInt(node.id.charAt(1))}`) {
        node.className = 'board__cell--highlight';
      }
    }
    return;
  }
};

initialState();
