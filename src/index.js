const start = require('./solver.js');
const Stack = require('./stack.js');

$(document).ready(function () {
	const towerW = 10,
		towerH = 200,
		towerX = 100,
		towerInc = 100;
	const diskW = 20,
		diskInc = 10,
		diskH = 15,
		diskGap = 2;

	var boardState = {
		towers: {
			left: new Stack('left'),
			middle: new Stack('middle'),
			right: new Stack('right')
		},
		moves: {
			index: -1,
			arr: [],
			next: function () { return this.arr[++this.index].slice(); },
			previous: function () { return this.arr[this.index--].slice(); },
			hasNext: function () { return this.arr.length > (this.index + 1) }
		},
		paused: false
	};

	var ctx;



	function init() {
		if (!boardState.paused) {
			boardState.paused = true;
			let n = !document ? 5 : parseInt(document.getElementById('input').value);
			if (n > 10) { n = 10; }
			for (let prop in boardState.towers) {
				boardState.towers[prop].clear();
			}
			for (let i = n; i > 0; i--) {
				boardState.towers.left.push(i);
			}
			boardState.moves.arr = start(n);
			boardState.moves.index = -1;

			drawBoard();
			boardState.paused = false;
		}

	};

	const drawBoard = function (highlight = null) {
		ctx.beginPath();
		ctx.rect(0, 0, 600, 600);
		ctx.fillStyle = '#CDE';
		ctx.fill();
		ctx.closePath();

		for (let prop in boardState.towers) {
			let [tx, ty] = getTowerLocation(prop);
			drawTower(tx, ty);
			console.log(prop);
			let tower = boardState.towers[prop].toArr();
			console.log(tower);
			for (let i = 0; i < tower.length; i++) {
				let [dx, dy] = getDiskLocation(tower[i], i + 1, tx);
				drawDisk(tower[i], dx, dy, highlight == tower[i]);
			}
		}
	};

	const nextFrame = function () {
		if (!boardState.paused) {
			boardState.paused = true;
			let [src, dest] = boardState.moves.next();
			frame(src, dest);
		}
	};

	const previousFrame = function () {
		console.log('previous');
		if (!boardState.paused) {
			boardState.paused = true;
			let [dest, src] = boardState.moves.previous();
			frame(src, dest);
		}
	};

	const frame = function (src, dest) {
		let towers = boardState.towers;

		let disk = towers[src].peek();
		drawBoard(disk);

		setTimeout(function () {
			towers[dest].push(towers[src].pop());
			drawBoard(disk);
			setTimeout(function () {
				drawBoard();
				boardState.paused = false;
				if (boardState.moves.hasNext()) {
					setTimeout(nextFrame, 250);
				}
			}, 250)
		}, 250);
	};

	const getTowerLocation = function (tower) {
		switch (tower) {
			case 'left':
				return [(towerX) - (towerW / 2), 100];
			case 'middle':
				return [(towerX + towerInc) - (towerW / 2), 100];
			case 'right':
				return [(towerX + towerInc * 2) - (towerW / 2), 100];
		}
	};

	const drawTower = function (x, y) {
		ctx.beginPath();
		ctx.rect(x, y, towerW, towerH);
		ctx.fillStyle = "#1d227c";
		ctx.fill();
		ctx.closePath();
	};

	const drawDisk = function (disk, x, y, highlight) {
		ctx.beginPath();
		let [sizeX, sizeY] = getDiskSize(disk);
		ctx.rect(x, y, sizeX, sizeY);
		ctx.fillStyle = highlight ? "#e02828" : "#000";
		ctx.fill();
		ctx.closePath();
	};

	const getDiskLocation = function (disk, posOnTower, towerX) {
		let [sizeX, sizeY] = getDiskSize(disk);
		let x = towerX - ((sizeX - towerW) / 2);
		let y = (100 + towerH) - (diskH * (posOnTower - 1) + diskInc * posOnTower);
		return [x, y];
	};

	const getDiskSize = function (disk) {
		let w = diskW + (diskInc * disk);

		return [w, diskH];
	};

	$('#next').click(nextFrame);
	$('#reset').click(init);
	var ctx = document.getElementById('canvas').getContext('2d');
});
