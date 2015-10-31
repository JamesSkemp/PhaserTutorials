var Game = {
	display: null,

	map: {},

	player: null,

	engine: null,

	init: function () {
		// Defaults to 80x25 cells.
		this.display = new ROT.Display();
		document.body.appendChild(this.display.getContainer());

		this._generateMap();

		// Scheduler handles turns.
		var scheduler = new ROT.Scheduler.Simple();
		// Add an actor as a recurring item, not a one-shot.
		scheduler.add(this.player, true);
		this.engine = new ROT.Engine(scheduler);
		this.engine.start();
	}
};

var Player = function (x, y) {
	this._x = x;
	this._y = y;
	this._draw();
};

Player.prototype._draw = function () {
	Game.display.draw(this._x, this._y, '@', '#ff0');
};

Player.prototype.act = function () {
	Game.engine.lock();
	// Wait for user input.
	window.addEventListener('keydown', this);
};

Player.prototype.handleEvent = function (e) {
	// TODO remove - used for debugging.
	console.log(e.keyCode + ' ' + e.keyIdentifier);
	// Process input.
	var keyMap = {};
	// Add in support for the numpad keys.
	keyMap[38] = 0; /* Up */
	keyMap[33] = 1;
	keyMap[39] = 2; /* Right */
	keyMap[34] = 3;
	keyMap[40] = 4; /* Down */
	keyMap[35] = 5;
	keyMap[37] = 6; /* Left */
	keyMap[36] = 7;

	var code = e.keyCode;

	if (!(code in keyMap)) {
		// Only support the keys we've mapped.
		return;
	}

	var diff = ROT.DIRS[8][keyMap[code]];
	var newX = this._x + diff[0];
	var newY = this._y + diff[1];

	var newKey = newX + ',' + newY;
	if (!(newKey in Game.map)) {
		// The player is attempting an illegal move.
		return;
	}

	// Draw whatever is supposed to be in the player's old location.
	Game.display.draw(this._x, this._y, Game.map[this._x + ',' + this._y]);
	this._x = newX;
	this._y = newY;
	this._draw();
	window.removeEventListener('keydown', this);
	Game.engine.unlock();
};

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