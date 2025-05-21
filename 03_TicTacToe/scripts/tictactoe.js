const HUMAN = 'X';
const AI = 'O';
let board = Array(9).fill('');   //3x3 board
let gameActive = true;
let difficulty = 'hard';
let allowInput = true;

const boardDiv = document.getElementById('board');
const statusDiv = document.getElementById('status');  //user win or AI win
const difficultySelect = document.getElementById('difficulty');
const restartBtn = document.getElementById('restartBtn');

difficultySelect.addEventListener('change', e => {
  difficulty = e.target.value;
  restartGame();                    // Reset game on difficulty change
});
restartBtn.addEventListener('click', restartGame);

function render() {
  boardDiv.innerHTML = '';
  board.forEach((cell, i) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell' + (cell ? ' taken' : '');  // Add taken class if cell is occupied
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', () => playerMove(i));
    boardDiv.appendChild(cellDiv);
  });
  updateStatus();
}

function updateStatus() {
  const {winner, line} = checkWinner(board, true);
  if (winner) {
    if (winner === 'draw') {
      statusDiv.textContent = "It's a draw! 🤝";
      statusDiv.style.color = "#F25F5C";
    } else {
      statusDiv.textContent = winner === HUMAN ? "You win! 🎉" : "AI wins! 🤖";
      statusDiv.style.color = winner === HUMAN ? "#43e97b" : "#38f9d7";

      // Highlight winning cells
      if (line) {
        for (const idx of line) {
          boardDiv.children[idx].classList.add('winner'); //
        }
      }
    }
    gameActive = false;
    allowInput = false;
  } else {
    statusDiv.textContent = "Your turn (X)";
    statusDiv.style.color = "#43e97b";
    allowInput = true;
  }
}

function playerMove(index) {
  if (!gameActive || board[index] || !allowInput) return; // Ignore if game is over or cell is taken
  board[index] = HUMAN;  
  render();  // Update board with player's move
  if (checkWinner(board).winner) return;   // Check if player wins
  // AI's turn
  allowInput = false;
  setTimeout(aiMove, 350);
}

function aiMove() {
  let move;
  if (difficulty === 'easy') move = aiMoveEasy();
  else if (difficulty === 'medium') move = aiMoveMedium();
  else move = bestMoveMinimax(); 
  if (move !== null && board[move] === '') {   //Once AI decides its move index → mark board[move] = AI and render.
    board[move] = AI;
    render();
  }
}

// --- AI Difficulty Levels ---
function aiMoveEasy() {

  const empties = board.map((v, i) => v === '' ? i : null).filter(i => i !== null);  //if cell is empty, store its index and remove nulls
  return empties.length ? empties[Math.floor(Math.random() * empties.length)] : null;  // Random move
}



function aiMoveMedium() {
 
  if (Math.random() < 0.6) {  // 60% chance to play smart
  
    // 1. Can AI win next?
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {  // Check empty cell
        board[i] = AI;
        if (checkWinner(board).winner === AI) {
          board[i] = ''; 
          return i;
        }                //attacking code
        board[i] = ''; 
      }
    }
    // 2. Can player win next? Block it.
    for (let i = 0; i < 9; i++) {
      if (!board[i]) {
        board[i] = HUMAN;
        if (checkWinner(board).winner === HUMAN) {
          board[i] = '';
          return i;
        }
        board[i] = '';    //defensive code
      }
    }
    return aiMoveEasy();
  } else {
    return aiMoveEasy();
  }
}



// --- Minimax AI for Hard Mode ---
function bestMoveMinimax() {
  let bestScore = -Infinity, move = null;   //we have to maximize the score that's why we start with -Infinity

  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = AI;    
      let score = minimax(board, 0, false);   // Call minimax to evaluate the move
      board[i] = '';
      if (score > bestScore) {  // If this move is better than the best score which is -Infinity
        bestScore = score;
        move = i;  //
      }
    }
  }
  return move;
}

function minimax(b, depth, isMaximizing) {
  const {winner} = checkWinner(b);  // Check for winner
  if (winner === AI) return 10 - depth;    //jaldi jeeta 
  if (winner === HUMAN) return depth - 10;  //late jeeta 
  if (winner === 'draw') return 0;    

  if (isMaximizing) { 
    let best = -Infinity;   // Start with worst score
    for (let i = 0; i < 9; i++) { 
      if (!b[i]) {      // If cell is empty
        b[i] = AI;   
        best = Math.max(best, minimax(b, depth + 1, false));   // Call minimax recursively
        b[i] = '';  
      } 
    }
    return best;  // Return best score
  } else {
    let best = Infinity;
    for (let i = 0; i < 9; i++) {
      if (!b[i]) {
        b[i] = HUMAN;  //
        best = Math.min(best, minimax(b, depth + 1, true));  //asumming human will play his best move so to defend we have to minimize the score
        b[i] = '';
      }
    }
    return best;
  }
}

// --- Game Logic ---
function checkWinner(b, wantLine = false) {   //wantline is used to highlight the winning line
  const winPatterns = [     // All possible winning patterns
    [0,1,2],[3,4,5],[6,7,8],  
    [0,3,6],[1,4,7],[2,5,8],  
    [0,4,8],[2,4,6]
  ];

  for (const pattern of winPatterns) {    // Check each pattern
    const [a, b1, c] = pattern;         
    if (b[a] && b[a] === b[b1] && b[a] === b[c]) {  // If all three cells are the same  
      return wantLine ? {winner: b[a], line: pattern} : {winner: b[a]};   // Return winner
    }
  }
  if (b.every(cell => cell)) return {winner: 'draw'};    //if all cells are filled and no winner
  return {winner: null};   
}

function restartGame() {
  board = Array(9).fill('');
  gameActive = true;
  allowInput = true;
  render();
}

// Initial render
render();