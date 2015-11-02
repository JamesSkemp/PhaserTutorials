/// <reference path="../lib/phaser-2.4.4.js" />
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'barkanoid', {

	paddle: null,
	ball: null,
	tiles: null,

	lives: 3,
	score: 0,

	ballOnPaddle: true,

	introText: null,

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
		tiles = game.add.group();
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
		paddle = game.add.sprite(game.world.centerX, 500, 'paddle');
		paddle.anchor.setTo(0.5);
		game.physics.enable(paddle, Phaser.Physics.ARCADE);
		paddle.body.collideWorldBounds = true;
		paddle.body.bounce.set(1);
		paddle.body.immovable = true;

		// Create the ball.
		ball = game.add.sprite(game.world.centerX, paddle.y - 16, 'ball');
		ball.anchor.setTo(0.5);
		ball.checkWorldBounds = true;
		game.physics.enable(ball, Phaser.Physics.ARCADE);
		ball.body.collideWorldBounds = true;
		ball.body.bounce.set(1);
		// If the ball is out of bounds we need to handle it.
		ball.events.onOutOfBounds.add(this.ballDeath, this);

		ballOnPaddle = true;

		var scoreText = game.add.text(32, 550, 'score: 0', { font: '20px Arial', fill: '#fff', align: 'left' });
		var livesText = game.add.text(680, 550, 'lives: 3', { font: '20px Arial', fill: '#fff', align: 'left' });
		introText = game.add.text(game.world.centerX, 400, 'click to start', { font: '40px Arial', fill: '#fff', align: 'center' });
		introText.anchor.setTo(0.5);
		
		game.input.onDown.add(this.releaseBall, this);
	},

	update: function () {
		paddle.x = game.input.x;

		// Keep the paddle within the bounds of the game.
		if (paddle.x < 24) {
			paddle.x = 24;
		} else if (paddle.x > game.width - 24) {
			paddle.x = game.width - 24;
		}
		
		if (ballOnPaddle) {
			// If the ball is on the paddle, move it when the paddle moves.
			ball.body.x = paddle.x;
		} else {
			// See if the ball has collided with the paddle or tiles.
			game.physics.arcade.collide(ball, paddle, this.ballCollidedWithPaddle, null, this);
			game.physics.arcade.collide(ball, tiles, this.ballCollidedWithTiles, null, this);
		}
	},

	ballDeath: function () {

	},

	releaseBall: function () {
		if (ballOnPaddle) {
			ballOnPaddle = false;
			ball.body.velocity.y = -300;
			ball.body.velocity.x = -75;
			introText.visible = false;
		}
	},

	ballCollidedWithPaddle: function () {

	},

	ballCollidedWithTiles: function () {

	}

});