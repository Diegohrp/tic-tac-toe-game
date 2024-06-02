const winnerLabel = document.querySelector('.winner-label');
const turnLabel = document.querySelector('.turn-label');
const grid = document.querySelector('.board__grid');

function clearBoard() {
  for (let node of grid.children) {
    node.innerHTML = '';
    node.value = '';
    node.className = 'board__cell';
  }
}

const drawFigure = ({ node, figure }) => {
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

//Identifies which colum, row or diagonal must be highlighted
const highLightCells = ({ row, col }) => {
  const { rows, cols, diag } = gameData;

  /*  Based on the button's id get its possition on the grid 
    to identify if the current button should be highlighted */

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
