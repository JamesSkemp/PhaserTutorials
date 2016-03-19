/// <reference path="../lib/phaser-2.4.4.js" />
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload: preload, create: create, update: update
});

function preload() {
	// Show debug information.
	game.add.plugin(Phaser.Plugin.Debug);

	this.load.path = "assets/";
	game.load.image('sky');
	game.load.image('platform');
	game.load.image('star');
	game.load.spritesheet('dude', 'dude.png', 32, 48);
}

var platforms;
var player;
var cursors;

var stars;

var score = 0;
var scoreText;

function create() {
	// Enable arcade physics.
	game.physics.startSystem(Phaser.Physics.ARCADE);

	// Background image.
	game.add.sprite(0, 0, 'sky');

	// Includes ground and the ledges.
	platforms = game.add.group();

	// Enable physics for all objects in this group.
	platforms.enableBody = true;

	// Create the ground.
	var ground = platforms.create(0, game.world.height - 64, 'platform');

	// Scale the image to fit the width of the game.
	ground.scale.setTo(2, 2);

	// Ground is solid and doesn't move.
	ground.body.immovable = true;

	// Create our first platform.
	var ledge = platforms.create(400, 400, 'platform');
	ledge.body.immovable = true;

	// Create the second platform.
	ledge = platforms.create(-150, 250, 'platform');
	ledge.body.immovable = true;

	// Create a group for the stars.
	stars = game.add.group();
	stars.enableBody = true;

	// Create 12 stars, evenly spaced.
	for (var i = 0; i < 12; i++) {
		// Create a star.
		var star = stars.create(i * 70, 0, 'star');

		// Give them gravity.
		star.body.gravity.y = 6;

		// Give each star a random bounce amount. 0 = no bounce and 1 = full bounce.
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	// Display the score in the top right corner (starting at 16x16). Use default browser font.
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

	// Create the player.
	player = game.add.sprite(32, game.world.height - 150, 'dude');

	// Enable physics on the player.
	game.physics.arcade.enable(player);
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	player.body.collideWorldBounds = true;

	// Player has walk animations, at 10 frames per second.
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	// Enable keyboard cursor support.
	cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// The player and platforms should collide.
	game.physics.arcade.collide(player, platforms);

	// The stars and platforms should collide.
	game.physics.arcade.collide(stars, platforms);

	// Collect stars if the player overlaps them.
	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	// Reset the player's velocity.
	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
		// Move to the left.
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if (cursors.right.isDown) {
		// Move to the right.
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		// Standing still.
		player.animations.stop();

		player.frame = 4;
	}

	// Player can jump if they're touching ground.
	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -350;
	}
}

function collectStar(player, star) {
	// Remove the star from the screen.
	star.kill();

	// Update the score.
	score += 10;
	scoreText.text = 'Score: ' + score;

}