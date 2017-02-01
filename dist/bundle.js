/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {

	return function () {
		function Stack(n) {
			_classCallCheck(this, Stack);

			this._name = n;
			this.clear();
		}

		_createClass(Stack, [{
			key: "clear",
			value: function clear() {
				this.arr = [];
				this.index = -1;
			}
		}, {
			key: "push",
			value: function push(val) {
				this.arr[++this.index] = val;
			}
		}, {
			key: "pop",
			value: function pop() {
				var tmp = this.arr[this.index];
				this.arr[this.index--] = void 0;
				return tmp;
			}
		}, {
			key: "empty",
			value: function empty() {
				return this.index < 0;
			}
		}, {
			key: "peek",
			value: function peek() {
				return this.arr[this.index];
			}
		}, {
			key: "name",
			value: function name() {
				return this._name;
			}
		}, {
			key: "toArr",
			value: function toArr() {
				return this.arr.slice().filter(function (a) {
					return a;
				});;
			}
		}]);

		return Stack;
	}();
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stack = __webpack_require__(0);

function solve(n, game) {
	var numMoves = Math.pow(2, n) - 1;
	var chain = [];
	var src = 'left',
	    aux = 'right',
	    dest = 'middle';

	if (n % 2 === 1) {
		var _ref = [dest, aux];
		aux = _ref[0];
		dest = _ref[1];
	}

	for (var i = 1; i <= numMoves; i++) {
		var tmp = i % 3;
		var move = void 0;
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
		return [b.name(), a.name()];
	} else if (b.empty()) {

		b.push(a.pop());
		return [a.name(), b.name()];
	} else if (a.peek() > b.peek()) {
		a.push(b.pop());
		return [b.name(), a.name()];
	} else {
		b.push(a.pop());
		return [a.name(), b.name()];
	}
}

function start(n) {
	var game = {
		left: new Stack('left'),
		middle: new Stack('middle'),
		right: new Stack('right')
	};

	for (var i = n; i >= 1; i--) {
		game.left.push(i);
	}
	return solve(n, game);
}

module.exports = start;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var start = __webpack_require__(1);
var Stack = __webpack_require__(0);

$(document).ready(function () {
	var towerW = 10,
	    towerH = 200,
	    towerX = 100,
	    towerInc = 100;
	var diskW = 20,
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
			next: function next() {
				return this.arr[++this.index].slice();
			},
			previous: function previous() {
				return this.arr[this.index--].slice();
			},
			hasNext: function hasNext() {
				return this.arr.length > this.index + 1;
			}
		},
		paused: false
	};

	var ctx;

	function init() {
		if (!boardState.paused) {
			boardState.paused = true;
			var n = !document ? 5 : parseInt(document.getElementById('input').value);
			if (n > 10) {
				n = 10;
			}
			for (var prop in boardState.towers) {
				boardState.towers[prop].clear();
			}
			for (var i = n; i > 0; i--) {
				boardState.towers.left.push(i);
			}
			boardState.moves.arr = start(n);
			boardState.moves.index = -1;

			drawBoard();
			boardState.paused = false;
		}
	};

	var drawBoard = function drawBoard() {
		var highlight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

		ctx.beginPath();
		ctx.rect(0, 0, 600, 600);
		ctx.fillStyle = '#CDE';
		ctx.fill();
		ctx.closePath();

		for (var prop in boardState.towers) {
			var _getTowerLocation = getTowerLocation(prop),
			    _getTowerLocation2 = _slicedToArray(_getTowerLocation, 2),
			    tx = _getTowerLocation2[0],
			    ty = _getTowerLocation2[1];

			drawTower(tx, ty);
			console.log(prop);
			var tower = boardState.towers[prop].toArr();
			console.log(tower);
			for (var i = 0; i < tower.length; i++) {
				var _getDiskLocation = getDiskLocation(tower[i], i + 1, tx),
				    _getDiskLocation2 = _slicedToArray(_getDiskLocation, 2),
				    dx = _getDiskLocation2[0],
				    dy = _getDiskLocation2[1];

				drawDisk(tower[i], dx, dy, highlight == tower[i]);
			}
		}
	};

	var nextFrame = function nextFrame() {
		if (!boardState.paused) {
			boardState.paused = true;

			var _boardState$moves$nex = boardState.moves.next(),
			    _boardState$moves$nex2 = _slicedToArray(_boardState$moves$nex, 2),
			    src = _boardState$moves$nex2[0],
			    dest = _boardState$moves$nex2[1];

			frame(src, dest);
		}
	};

	var previousFrame = function previousFrame() {
		console.log('previous');
		if (!boardState.paused) {
			boardState.paused = true;

			var _boardState$moves$pre = boardState.moves.previous(),
			    _boardState$moves$pre2 = _slicedToArray(_boardState$moves$pre, 2),
			    dest = _boardState$moves$pre2[0],
			    src = _boardState$moves$pre2[1];

			frame(src, dest);
		}
	};

	var frame = function frame(src, dest) {
		var towers = boardState.towers;

		var disk = towers[src].peek();
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
			}, 250);
		}, 250);
	};

	var getTowerLocation = function getTowerLocation(tower) {
		switch (tower) {
			case 'left':
				return [towerX - towerW / 2, 100];
			case 'middle':
				return [towerX + towerInc - towerW / 2, 100];
			case 'right':
				return [towerX + towerInc * 2 - towerW / 2, 100];
		}
	};

	var drawTower = function drawTower(x, y) {
		ctx.beginPath();
		ctx.rect(x, y, towerW, towerH);
		ctx.fillStyle = "#1d227c";
		ctx.fill();
		ctx.closePath();
	};

	var drawDisk = function drawDisk(disk, x, y, highlight) {
		ctx.beginPath();

		var _getDiskSize = getDiskSize(disk),
		    _getDiskSize2 = _slicedToArray(_getDiskSize, 2),
		    sizeX = _getDiskSize2[0],
		    sizeY = _getDiskSize2[1];

		ctx.rect(x, y, sizeX, sizeY);
		ctx.fillStyle = highlight ? "#e02828" : "#000";
		ctx.fill();
		ctx.closePath();
	};

	var getDiskLocation = function getDiskLocation(disk, posOnTower, towerX) {
		var _getDiskSize3 = getDiskSize(disk),
		    _getDiskSize4 = _slicedToArray(_getDiskSize3, 2),
		    sizeX = _getDiskSize4[0],
		    sizeY = _getDiskSize4[1];

		var x = towerX - (sizeX - towerW) / 2;
		var y = 100 + towerH - (diskH * (posOnTower - 1) + diskInc * posOnTower);
		return [x, y];
	};

	var getDiskSize = function getDiskSize(disk) {
		var w = diskW + diskInc * disk;

		return [w, diskH];
	};

	$('#next').click(nextFrame);
	$('#previous').click(previousFrame);
	$('#reset').click(init);
	var ctx = document.getElementById('canvas').getContext('2d');
});

/***/ })
/******/ ]);