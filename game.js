angular
  .module("tictactoe", [])
  .controller("TicTacToeController", GameController);

function GameController() {
  this.state = [];
  this.currentPlayer = "X";
  this.movesLeft = 9;

  this.finished = false;
  this.resultText = "";
  this.winner = "";

  // init array
  this.initState();
}

GameController.prototype.initState = function() {
  for (var i = 0; i < 3; i++) {
    this.state[i] = [];
    for (var j = 0; j < 3; j++) {
      this.state[i][j] = "";
    }
  }
};

GameController.prototype.putSign = function($event) {
  var id = $event.target.id.split("_"), 
  	   i = id[0], 
	   j = id[1];

  if (!this.moveAllowed(i, j)) {
    return false;
  }

  this.state[i][j] = this.currentPlayer;

  this.movesLeft--;

  this.check();
  this.switchPlayer();
};

GameController.prototype.moveAllowed = function(i, j) {
  if (this.movesLeft === 0 || this.finished) {
    return false;
  }

  return this.state[i][j] === "";
};

GameController.prototype.check = function() {
  var xCounter = 0;
  var oCounter = 0;

  var winner = false;

  // poziomy
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (this.state[i][j] == "O") oCounter++;
      if (this.state[i][j] == "X") xCounter++;
    }
    if (oCounter == 3) winner = "O";
    if (xCounter == 3) winner = "X";

    xCounter = 0;
    oCounter = 0;
  }

  // piony
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (this.state[j][i] == "O") oCounter++;
      if (this.state[j][i] == "X") xCounter++;
    }
    if (oCounter == 3) winner = "O";
    if (xCounter == 3) winner = "X";

    xCounter = 0;
    oCounter = 0;
  }
  // skosy
  if (this.state[0][0] == "O") oCounter++;
  if (this.state[0][0] == "X") xCounter++;

  if (this.state[1][1] == "O") oCounter++;
  if (this.state[1][1] == "X") xCounter++;

  if (this.state[2][2] == "O") oCounter++;
  if (this.state[2][2] == "X") xCounter++;

  if (oCounter == 3) winner = "O";
  if (xCounter == 3) winner = "X";
  xCounter = 0;
  oCounter = 0;

  if (this.state[0][2] == "O") oCounter++;
  if (this.state[0][2] == "X") xCounter++;

  if (this.state[1][1] == "O") oCounter++;
  if (this.state[1][1] == "X") xCounter++;

  if (this.state[2][0] == "O") oCounter++;
  if (this.state[2][0] == "X") xCounter++;

  if (oCounter == 3) winner = "O";
  if (xCounter == 3) winner = "X";

  if (!winner) {
    if (this.movesLeft === 0) {
      this.endWithTie();
    }
  } else {
    this.end(winner);
  }
};

GameController.prototype.switchPlayer = function() {
  if (this.currentPlayer === "X") {
    this.currentPlayer = "O";
  } else {
    this.currentPlayer = "X";
  }
};

GameController.prototype.end = function(winner) {
  this.resultText = "Wygrał gracz: " + winner;
  this.finished = true;
};

GameController.prototype.endWithTie = function(winner) {
  this.resultText = "Remis!";
  this.finished = true;
};
