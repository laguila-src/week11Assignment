// •	Create a Tic-Tac-Toe game grid using your HTML element of choice.
// •	When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
// •	A heading should say whether it is X’s or O’s turn and change with each move made.
// •	A button should be available to clear the grid and restart the game.
// •	When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar
//    Bootstrap component should appear across the screen announcing the winner.

// Constant variables for our X and O  marks
const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";

// This array represents the possible winning combinations which will help us
// check if the game is over or if it's still active.
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// The next statements will use the id tags assigned to the HTML elements so that
// we can access them.

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");

const headingInfoElement = document.getElementById("headingInfo");
const headingInfoTextElement = document.getElementById("headingInfoText");

let isPlayer_O_Turn = false;

console.log(restartButton);

// Let's start a game of tic-tac-toe
startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  // Player with X mark always starts the game
  isPlayer_O_Turn = false;
  // Before starting the game, remove all X's and O's from previous game.
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);

    // Remove event listener from every cell, to prevent the event getting
    // triggered multiple times with mouse clicks unnecessarily.
    cell.removeEventListener("click", handleCellClick);
    // Add an event listener to each cell, using { once: true } user can
    // only click on cell once.
    cell.addEventListener("click", handleCellClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleCellClick(e) {
  const cell = e.target;
  // This variable saves current player's mark.
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;

  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

// This function will end the game and will print the appropriate
// message: either a win or a draw.
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `Player ${
      isPlayer_O_Turn ? "O" : "X"
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
}

// Access content of cell and add mark that is passed.
function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

// Function to switch player turn.
function swapTurns() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}

// While hovering over each cell with the mouse cursor, we want to be
// able to see the X or O before placing it.
function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
  displayCurrentPlayer(isPlayer_O_Turn);
}

// This function will check if the board has any of the winning combinations.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// Function to display who the current player is. It changes
// with each move made.
function displayCurrentPlayer(isPlayer) {
  headingInfoTextElement.innerText = `It's Player ${
    isPlayer_O_Turn ? "O" : "X"
  }'s turn!`;
}
