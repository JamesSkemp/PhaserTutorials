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
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// The bottom of walls don't cause collisions.
		game.physics.arcade.checkCollision.down = false;

		var background = game.add.tileSprite(0, 0, 800, 600, 'background');

		// Create a group to store our tiles.
		var tiles = game.add.group();
		tiles.enableBody = true;
		tiles.physicsBodyType = Phaser.Physics.ARCADE;

		// We'll create four rows of fifteen tiles.
		for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 15; x++) {
				// Use a random tile.
				var randomTileNumber = Math.floor(Math.random() * 6);
				var tile = tiles.create(120 + (x * 36), 100 + (y * 52), 'tile' + randomTileNumber);
				tile.body.bounce.set(1);
				tile.body.immovable = true;
			}
		}

		// Create the player's paddle.
		var paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
		paddle.anchor.setTo(0.5);
		game.physics.enable(paddle, Phaser.Physics.ARCADE);
		paddle.body.collideWorldBounds = true;
		paddle.body.bounce.set(1);
		paddle.body.immovable = true;
	},

	update: function () {
		
	}

});