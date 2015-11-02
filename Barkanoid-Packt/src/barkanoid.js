/// <reference path="../lib/phaser-2.4.4.js" />
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'barkanoid', {

	preload: function () {
		game.load.path = 'assets/';
		game.load.image('background', 'background.jpg');
		game.load.image('tile0');
		game.load.image('tile1');
		game.load.image('tile2');
		game.load.image('tile3');
		game.load.image('tile4');
		game.load.image('tile5');
		game.load.image('paddle');
		game.load.image('ball');
	},

	create: function () {

	},

	update: function () {
		
	}

});