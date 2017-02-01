const Stack = require('./stack.js')

function solve(n, game){
	let numMoves = Math.pow(2, n) - 1;
	let chain = [];
	let [src, aux, dest] = ['left', 'right', 'middle'];
	if (n % 2 === 1) {
		[aux, dest] = [dest, aux];
	}

	for (let i = 1; i <= numMoves; i++){
		let tmp = i % 3;
		let move;
		if (tmp === 1) {
			move = getMove(game[src], game[dest]);
		} else if (tmp === 2) {
			move = getMove(game[src], game[aux]);
		} else {
			move = getMove(game[aux], game[dest]);
		}
		chain.push(move);
	}

	return chain;
}

// a and b are chosen from [left, right, middle]
function getMove(a, b) {
	if (a.empty()) {
		a.push(b.pop());
		return [b.name(),a.name()];
	} else if (b.empty()){
		
		b.push(a.pop());
		return [a.name(),b.name()];
	} else if (a.peek() > b.peek()){
		a.push(b.pop());
		return [b.name(),a.name()];
	} else {
		b.push(a.pop());
		return [a.name(),b.name()];
	}

}

function start(n) {
	let game = {
		left: new Stack('left'),
		middle: new Stack('middle'),
		right: new Stack('right')
	};

	for (let i = n; i >= 1; i--){
		game.left.push(i);
	}
	return solve(n, game);
}




module.exports = start;