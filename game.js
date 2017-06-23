angular
  .module("tictactoe", [])
  .filter('nbsp', function ($sce) {
	  return function (input) {
		  if (input === '') {
			  return $sce.trustAsHtml('&nbsp;');
		  } else {
			  return $sce.trustAsHtml(input);
		  }
	  }
  })
  .controller("TicTacToeController", ['nbspFilter', GameController]);

function GameController(nbspFilter) {

  this.SIZE = 3; 

  this.state = [];
  this.currentPlayer = "X";
  this.movesLeft = this.SIZE * this.SIZE;

  this.finished = false;
  this.resultText = "";
  this.winner = "";

  // init array
  this.initState();
}

GameController.prototype.initState = function() {
  for (var i = 0; i < this.SIZE; i++) {
    this.state[i] = [];
    for (var j = 0; j < this.SIZE; j++) {
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
  var xCounter = oCounter = 0;

  var winner = false;

  // poziomy
  for (var i = 0; i < this.SIZE; i++) {
    for (var j = 0; j < this.SIZE; j++) {
      if (this.state[i][j] == "O") oCounter++;
      if (this.state[i][j] == "X") xCounter++;
    }
    if (oCounter == this.SIZE) winner = "O";
    if (xCounter == this.SIZE) winner = "X";

    xCounter = oCounter = 0;
  }

  // piony
  for (var i = 0; i < this.SIZE; i++) {
    for (var j = 0; j < this.SIZE; j++) {
      if (this.state[j][i] == "O") oCounter++;
      if (this.state[j][i] == "X") xCounter++;
    }
    if (oCounter == this.SIZE) winner = "O";
    if (xCounter == this.SIZE) winner = "X";

    xCounter = oCounter = 0;
  }
  // skosy

  for (var i = 0; i < this.SIZE; i++) {
	if (this.state[i][i] == "O") oCounter++;
    if (this.state[i][i] == "X") xCounter++;
  }

  if (oCounter == this.SIZE) winner = "O";
  if (xCounter == this.SIZE) winner = "X";

  xCounter = oCounter = 0;

  for (var i = 0, j = this.SIZE - 1; i < this.SIZE; i++, j--) {
	if (this.state[i][j] == "O") oCounter++;
    if (this.state[i][j] == "X") xCounter++;
  }

  if (oCounter == this.SIZE) winner = "O";
  if (xCounter == this.SIZE) winner = "X";

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
