var playerSymbol = "X";// Player Symbol
var computerSymbol = "O"; // Computer Symbol
var win;   // when somebody win 
var turn, gameBoard = ['', '', '', '', '', '', '', '', '']; // the main game display 
var row, column;  // specific cell coordinates
var cpuEnabled = true;   // enable to play against AI
var playerScore = 0, computerScore = 0, winner = ""; // Keeping score of the game

//Start//
$(document).ready(function()
 {
  $("#screen").fadeOut(300, showGameScreen);
  startGame();

  $("#restart").on("click", function() {
    restartGame();
  });
  $(".cell").on("click", function() {
// click empty cells & who's turn to play
    if(!win && this.innerHTML === "") {
      if(turn%2 === 0) { // Players turn if its even 
        $(".display-turn").html("Computer’s turn");
        insertSymbol(this, playerSymbol);
      }
      else { 
        setTimeout(() => {
          if(!win){
            $(".display-turn").html("Your turn");
          }
        }, 200);
        insertSymbol(this, computerSymbol);
      }
    }
  });
});

// Main functions//

function currentPlayer() {
  return turn % 2 === 0 ? 'X' : 'O';
}

//enter symbol
function insertSymbol(element, symbol) {
  element.innerHTML = symbol;
  currentCell = parseInt(element.dataset.id);
  if(symbol == "X"){
    gameBoard[currentCell] = 'X';
  }else{
    gameBoard[currentCell] = 'O';
  }
  if(symbol === computerSymbol)
    $("#" + element.id).addClass("player-two"); // Color enemy symbol differently

  checkWinConditions(element);
  turn++;
// All cell are filled or winner declared
  if(win || turn > 8) {
    $("#restart").addClass("btn-green");  // restart button
    
    checkAndUpdate(winner);
  }
  else if(cpuEnabled && turn%2 !== 0) {
    cpuTurn();
  }
}

// start game
function startGame() {
 
  $("#ComputerScreen").fadeOut(300, showGameScreen);
  restartGame();
}
function showGameScreen() {
  $("#game-screen").fadeIn(300);
  $("#game-screen").addClass("grid");
}

// reset everything when press restart //
function restartGame() {
  turn = 0;
  win = false;
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  winner = "";
  $(".cell").text("");
  $(".cell").removeClass("wincell");
  $(".cell").removeClass("cannotuse");
  $(".cell").removeClass("player-two");
  $("#restart").removeClass("btn-green");
  $(".display-turn").html("Your turn");
}

//winning combination in the grid  using 2D Array //
function checkWinConditions(element) {
  const winningSequences = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  winningSequences.forEach( winningCombos => {
    let cell1 = winningCombos[0];
    let cell2 = winningCombos[1];
    let cell3 = winningCombos[2];
    if (
      gameBoard[cell1] === currentPlayer() &&
      gameBoard[cell2] === currentPlayer() &&
      gameBoard[cell3] === currentPlayer()
    ){
      const cells = document.querySelectorAll('.cell');
      cells.forEach( cell => {
        let cellId = cell.dataset.id;	
        if (cellId == cell1 || cellId == cell2 || cellId == cell3 ) {
          cell.classList.add('wincell');
          win = true;
          winner = element.innerText;
        }
      });
    }
  });
}
// Display who won the game and keep track of the score//
function checkAndUpdate(e){
  if(e == "X"){
    playerScore++;
    $(".display-turn").html("Player Won");
  }else{
    computerScore++;
    $(".display-turn").html("Computer Won");
  }
  $(".player-score").html(playerScore);
  $(".computer-score").html(computerScore);
}
// AI activate on random clicked cell//
function cpuTurn() {
  var ok = false;
  
  while(!ok) {
    row = Math.floor(Math.random() * 3);
    column = Math.floor(Math.random() * 3);
    console.log($("#cell"+row+column))
    if( $("#cell"+row+column).text() === "" ) {
      ok = true;
    }
  }
  console.log($("#cell"+row+column));
  $("#cell"+row+column).click(); 
}
