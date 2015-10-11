﻿/// <reference path="../lib/phaser.min.js" />
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload: preload, create: create, update: update
});

function preload() {
	game.load.image('sky', 'assets/sky.png');
	game.load.image('platform', 'assets/platform.png');
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var platforms;
var player;

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


}

function update() {
}