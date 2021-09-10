const squares = document.querySelectorAll('.square');
const display = document.querySelector('.display');
const newGame = document.querySelector('#reset');

const gameBoard = (() => {
	let board = [['', '', ''], ['', '', ''], ['', '', '']];
	console.log()
	const clearBoard = () => {
		board = board.map(row => {
			return row.map(item =>{
				return item = '';
			});
		});
	}

	const isFull = () => {
		return !(board.some(row => {
			return row.some(item => {
				return item === '';
			})
		}))
	}

	const addToBoard = (row, column, sign) => {
		if(board[row][column] !== ''){
			return 'error'
		}
		board[row][column] = sign; 
	}

	const getBoard = () => board;

	const haveWinner = () => {
		return ((!!board[0][0] && board[0][0] === board[1][0] && board[0][0] === board[2][0]) ||
				(!!board[0][1] && board[0][1] === board[1][1] && board[0][1] === board[2][1]) ||
				(!!board[0][2] && board[0][2] === board[1][2] && board[0][2] === board[2][2]) ||
				(board.some(row => row.every(item => item === 'x') || row.every(item => item === 'o'))) ||
				(!!board[0][0] && board[0][0] === board[1][1] && board[0][0] === board [2][2]) ||
				(!!board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])
			)
	}

	return {getBoard, isFull, clearBoard, haveWinner, addToBoard}
})();

const Player = (sign, turn) => {
	const getSign = () => sign;
	const switchTurn = () => {turn = !turn};
	const isTurn =  () => turn;
	return {getSign, switchTurn, isTurn}
}

let xPlayer = Player('x', false);
let oPlayer = Player('o', true);



squares.forEach(square => square.addEventListener('click', handleClick))
newGame.addEventListener('click', handleReset);

function handleReset(e){
	gameBoard.clearBoard();
	squares.forEach(square => {square.innerText = ''});
	if(xPlayer.isTurn()){
		xPlayer.switchTurn();
		oPlayer.switchTurn();
	}
}

function handleClick(e) {
	if (gameBoard.haveWinner()){
		return;
	}
	let row = e.target.getAttribute('data-row');
	let column = e.target.getAttribute('data-column');
	let sign = xPlayer.isTurn() ? xPlayer.getSign() : oPlayer.getSign();
	if(gameBoard.addToBoard(row, column, sign) === 'error'){
		console.log('error');
		return
	}
	e.target.innerText = sign;
	if(gameBoard.haveWinner()){
		display.textContent = 'Winner!!';
	}
	if(gameBoard.isFull()){
		display.textContent = 'That\'s a tie, bummer.';
	}
	xPlayer.switchTurn();
	oPlayer.switchTurn();
}

