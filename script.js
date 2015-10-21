// ******************
//  TIC TAC TOE SCRIPT
// ******************

var winners = [ 
	["A1","A2","A3"],
	["B1","B2","B3"],
	["C1","C2","C3"],
	["A1","B2","C3"],
	["A1","B1","C1"],
	["A2","B2","C2"],
	["A3","B3","C3"],
	["A3","B2","C1"]
]
var won;
var compWait       = false
var computer       = true;
var player         = false;
var playerOneMarks = [];
var playerTwoMarks = [];
var playerMode = 0;
// HTML Buttons
var body    = document.getElementsByTagName('body')[0];
var message = document.getElementById('message');
var board   = document.getElementById('board-wrapper');
var buttons = board.getElementsByTagName('button');

function onePlayer() {
	computer = true;
	player = false;
	message.innerHTML = "Make your first move!";
	playerMode = 1;
}

function twoPlayers() {
	computer = false;
	player = false;
	message.innerHTML = "Player 1 make your move!";
	playerMode = 2;
}

function markSqr(button) {
	
	if(playerMode == 0) {
		message.innerHTML = "Choose a game mode";
		return;
	}
	if ((playerOneMarks.indexOf(button) > -1) || (playerTwoMarks.indexOf(button) > -1)) {
		message.innerHTML = "That box is taken..";
		return;
	}

	if(compWait) {
		message.innerHTML = "Wait your turn..";
		return;
	}
	document.getElementById(button).classList.remove('empty');
	var mark = player? 'O':'X';
	if (!player && !won) {
		message.innerHTML = "Player 2 make your move";
		playerOneMarks.push(button);
		checkWins(playerOneMarks, 0);
		document.getElementById(button).innerHTML = mark;
		player = 1;
		if(computer && !won){
			message.innerHTML = "My turn";
			computerMove();
		}
	} else if (!won) {
	
		playerTwoMarks.push(button);
		checkWins(playerTwoMarks, 1);
		document.getElementById(button).innerHTML = mark;
		player = 0;
	}
}

function computerMove() {
	// Set var to indicate the computer is thinking
	// return;
	compWait = true;

	// TODO: Indicate its the computers turn

	// Make the computer look like its thinking
	compTimer = setTimeout(function() {
		computerMarkSqr();
		compWait = false;
		message.innerHTML = "Your turn";
	}, 1200);
	player = 0;
}

function computerMarkSqr() {
	// TODO: Make a smark choice on what square to choose

	    // Get random button between 1 and 9 (buttons.length)
    var randButton = buttons[Math.floor((Math.random() * buttons.length) + 1) - 1];
    while ((playerOneMarks.indexOf(randButton.id) > -1) || (playerTwoMarks.indexOf(randButton.id)) > -1) {
    	randButton = buttons[Math.floor((Math.random() * buttons.length) + 1) - 1];
    }
    playerTwoMarks.push(randButton.id);
    checkWins(playerTwoMarks, 1);
    randButton.classList.remove('empty');
    randButton.innerHTML = "O";
}

function checkWins(playerMarks, player) {
	// Count how many elements in a row for the given player
	var rowCount = 0;
	var thisWinCombination;
	// Check each winning combination
	for (i = 0; i < winners.length; i++) {
		rowCount = 0;
		thisWinCombination = winners[i];
		// Check if all the elements in the winners array exist in the current players chosen marks
		for (j = 0; j < thisWinCombination.length; j++) {
			// Check if this element of the win combo is in the playersMarks array
			if (playerMarks.indexOf(thisWinCombination[j]) > -1) {
				rowCount++;
			}
		}

		if (rowCount === 3) {
			// Somebody won
			won = true;

			// End the game and give the gameOver function the winning combo
			gameOver(thisWinCombination, player);
			return;
		}
	}

	if (!won) {
		// Check for a draw
		checkDraw(player);
	}
}

function checkDraw(player) {
	return;
}

function gameOver(winningRow, player) {
	// If user is playing the computer message you win
	// If its a 2 player game messgae player 1 wins
	// return;
	if(!computer) {
		if(!player) {
			board.className += ' winner-play1';
			message.className += ' message-play1';
			message.innerHTML = "YOU WIN!";
		} else {
			board.className += ' winner-play2';
       		message.className += ' message-play2';
        	message.innerHTML = 'YOU LOST!';
		}
	} else { 
		if(!player) {
			board.className += ' winner-play1';
			message.className += ' message-play1';
			message.innerHTML = "PLAYER 1 WINS!";
		} else {
			board.className += ' winner-play2';
       		message.className += ' message-play2';
        	message.innerHTML = 'PLAYER 2 WINS!';
		}
	}

	// Highlight winning row
	for (var i = 0; i < winningRow.length; i++) {
		document.getElementById(winningRow[i]).className += ' winning-sqr';
	}

	// Set board for the end of the game
	finishGame();
	
}

function finishGame() {
	return;
}




