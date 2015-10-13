/// <reference path="../lib/phaser-2.4.3.js" />
var game = new Phaser.Game(640, 480, Phaser.AUTO);

game.state.add('play', {
	init: function () {
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function () {
		game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tiles.png');
		game.load.image('car', 'assets/car.png');
	},

	create: function () {
	},

	update: function () {
	},

	render: function () {
	}
});

game.state.start('play');