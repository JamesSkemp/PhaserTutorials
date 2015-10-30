var Game = {
	display: null,

	init: function () {
		// Defaults to 80x25 cells.
		this.display = new ROT.Display();
		document.body.appendChild(this.display.getContainer());

		this._generateMap();
	}
};

Game.map = {};

var Player = function (x, y) {
	this._x = x;
	this._y = y;
	this._draw();
};

Player.prototype._draw = function () {
	Game.display.draw(this._x, this._y, '@', '#ff0');
};

Game.player = null;

Game._generateMap = function () {
	var digger = new ROT.Map.Digger();
	var freeCells = [];

	var digCallback = function (x, y, value) {
		if (value) {
			// Don't store walls.
			return;
		}

		var key = x + ',' + y;
		freeCells.push(key);
		this.map[key] = "."
	}

	digger.create(digCallback.bind(this));

	this._generateBoxes(freeCells);

	this._drawWholeMap();

	this._createPlayer(freeCells);
};

Game._generateBoxes = function (freeCells) {
	// Add 10 boxes to the map, which might contain a pineapple.
	for (var i = 0; i < 10; i++) {
		var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
		var key = freeCells.splice(index, 1)[0];
		this.map[key] = '*';
	}
};

Game._createPlayer = function (freeCells) {
	var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
	var key = freeCells.splice(index, 1)[0];
	var parts = key.split(',');
	var x = parseInt(parts[0]);
	var y = parseInt(parts[1]);
	this.player = new Player(x, y);
};

Game._drawWholeMap = function () {
	for (var key in this.map) {
		var parts = key.split(',');
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		this.display.draw(x, y, this.map[key]);
	}
};