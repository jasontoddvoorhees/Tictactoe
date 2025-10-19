const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'jason'; // Player = Jason, AI = Rival
let isGameActive = true;
let singlePlayerMode = true; // AI opponent enabled

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    if (cell === 'jason') cellElement.classList.add('jason');
    if (cell === 'rival') cellElement.classList.add('rival');
    cellElement.addEventListener('click', () => onCellClicked(index));
    if (cell) cellElement.classList.add('disabled');
    boardElement.appendChild(cellElement);
  });
}

function onCellClicked(index) {
  if (!isGameActive || board[index] || (singlePlayerMode && currentPlayer !== 'jason')) return;
  
  board[index] = currentPlayer;
  updateBoard();
  
  if (checkWin()) {
    messageElement.textContent = `${capitalize(currentPlayer)} wins! 🎃🔪`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    messageElement.textContent = "It's a tie! 🎃";
    isGameActive = false;
  } else {
    togglePlayer();
    messageElement.textContent = `${capitalize(currentPlayer)}'s turn`;
    if (singlePlayerMode && currentPlayer === 'rival') {
      setTimeout(aiMove, 500);
    }
  }
}

function aiMove() {
  if (!isGameActive) return;
  
  const emptyIndices = board.map((v, i) => v === '' ? i : null).filter(i => i !== null);
  if (emptyIndices.length === 0) return;
  
  const choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[choice] = currentPlayer;
  updateBoard();
  
  if (checkWin()) {
    messageElement.textContent = `${capitalize(currentPlayer)} wins! 🎃🔪`;
    isGameActive = false;
  } else if (board.every(cell => cell !== '')) {
    messageElement.textContent = "It's a tie! 🎃";
    isGameActive = false;
  } else {
    togglePlayer();
    messageElement.textContent = `${capitalize(currentPlayer)}'s turn`;
  }
}

function updateBoard() {
  createBoard();
}

function togglePlayer() {
  currentPlayer = (currentPlayer === 'jason') ? 'rival' : 'jason';
}

function checkWin() {
  return winningConditions.some(([a, b, c]) => board[a] && board[a] === board[b] && board[b] === board[c]);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

resetButton.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'jason';
  isGameActive = true;
  messageElement.textContent = `${capitalize(currentPlayer)} starts!`;
  updateBoard();
});

messageElement.textContent = `${capitalize(currentPlayer)} starts!`;
createBoard();
