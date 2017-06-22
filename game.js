angular.module('tictactoe', [])
		.controller('TicTacToeController', GameController);
	

	function GameController() {
		this.state = [];
		this.currentPlayer = 'X';
		
		// inicjalizacja tablicy
		for (var i = 0; i < 3; i++) {
			this.state[i] = [];
			for (var j = 0; j < 3; j++) {
				this.state[i][j] = '';
			}
		}
	
	}
	
	GameController.prototype.putSign = function ($event) {
		var id = $event.target.id.split('_');
		var i = id[0],
			j = id[1];
			
		if (!this.hasPermissionToPutSign(i, j)) {
			return false;
		}
		
		this.state[i][j] = this.currentPlayer;
		
		// sprawdzanie czy ktos wygral
		this.check();
		// zmienic gracza
		this.switchPlayer();
	}
	
	GameController.prototype.hasPermissionToPutSign = function (i, j) {
		if (this.state[i][j] === '') {
			return true;
		} else {
			return false;
		}
	}
	
	GameController.prototype.check = function () {
		// sprawdzanie
		var xCounter = 0;
		var oCounter = 0;

		var winner = false;
		
		// poziomy
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (this.state[i][j] == 'O') oCounter++;
				if (this.state[i][j] == 'X') xCounter++;
			}
		}
		if (oCounter == 3) winner = 'O';
		if (xCounter == 3) winner = 'X';

		xCounter = 0; oCounter = 0;
		// piony
		for (var i = 0; i < 3; i++) {
			for (var j = 0; j < 3; j++) {
				if (this.state[j][i] == 'O') oCounter++;
				if (this.state[j][i] == 'X') xCounter++;
			}
		}
		if (oCounter == 3) winner = 'O';
		if (xCounter == 3) winner = 'X';

		xCounter = 0; oCounter = 0;
		// skosy
		if (this.state[0][0] == 'O') oCounter++;
		if (this.state[0][0] == 'X') xCounter++;
		
		if (this.state[1][1] == 'O') oCounter++;
		if (this.state[1][1] == 'X') xCounter++;
		
		if (this.state[2][2] == 'O') oCounter++;
		if (this.state[2][2] == 'X') xCounter++;

		if (oCounter == 3) winner = 'O';
		if (xCounter == 3) winner = 'X';
		xCounter = 0; oCounter = 0;
		
		if (this.state[0][2] == 'O') oCounter++;
		if (this.state[0][0] == 'X') xCounter++;
		
		if (this.state[1][1] == 'O') oCounter++;
		if (this.state[1][1] == 'X') xCounter++;
		
		if (this.state[2][0] == 'O') oCounter++;
		if (this.state[2][0] == 'X') xCounter++;

		if (oCounter == 3) winner = 'O';
		if (xCounter == 3) winner = 'X';
		xCounter = 0; oCounter = 0;

		if (!winner) {
			// pat albo jeszcze nie koniec
		} else {
			alert("Wygrana gracza" + winner);
			this.currentPlayer = 'wygrał gracz ' + winner;
		}
	}
	
	GameController.prototype.switchPlayer = function () {
		// sprawdzanie
		if (this.currentPlayer === 'X') {
			this.currentPlayer = 'O';
		} else {
			this.currentPlayer = 'X';
		}
	}