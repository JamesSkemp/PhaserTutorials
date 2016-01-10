/// <reference path="../lib/phaser-2.4.4.js" />
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload: preload, create: create, update: update
});

function preload() {
}

var platforms;
var player;
var cursors;

var stars;

var score = 0;
var scoreText;

function create() {
	// Display the score in the top right corner (starting at 16x16). Use default browser font.
	scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#f00' });

	// Enable keyboard cursor support.
	cursors = game.input.keyboard.createCursorKeys();

	game.input.onUp.add(submitScore, this);
}

function update() {
	if (cursors.up.isDown) {
		score++;
		scoreText.text = 'Score: ' + score;
	}
}

function submitScore() {
	$.ajax({
		url: 'test?score=' + score
	})
	.done(function () {
		console.log('done');
	})
	.fail(function () {
		console.log('failed');
	});
}