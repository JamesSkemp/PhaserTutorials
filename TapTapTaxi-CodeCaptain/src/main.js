var GAME_WIDTH = 480;
var GAME_HEIGHT = 640;

var state = {
	init: init,
	preload: preload,
	create: create,
	update: update
};

var phaserGame = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'container', state);

function init() {
	taxiGame.init();
}

function preload() {
	taxiGame.init();
}

function create() {
	taxiGame.init();
}

function update() {
	taxiGame.init();
}

var taxiGame = new TTTGame(phaserGame);