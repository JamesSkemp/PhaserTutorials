﻿var BasicGame = {
	SEA_SCROLL_SPEED: 12,
	PLAYER_SPEED: 300,
	ENEMY_MIN_Y_VELOCITY: 30,
	ENEMY_MAX_Y_VELOCITY: 60,
	SHOOTER_MIN_VELOCITY: 30,
	SHOOTER_MAX_VELOCITY: 80,
	BULLET_VELOCITY: 500,
	ENEMY_BULLET_VELOCITY: 150,

	SPAWN_ENEMY_DELAY: Phaser.Timer.SECOND,
	SPAWN_SHOOTER_DELAY: Phaser.Timer.SECOND * 3,

	SHOT_DELAY: Phaser.Timer.SECOND * 0.1,
	SHOOTER_SHOT_DELAY: Phaser.Timer.SECOND * 2,

	ENEMY_HEALTH: 2,
	SHOOTER_HEALTH: 5,

	BULLET_DAMAGE: 1,
	CRASH_DAMAGE: 5,

	ENEMY_REWARD: 100,
	SHOOTER_REWARD: 400,

	PLAYER_EXTRA_LIVES: 3,
	PLAYER_GHOST_TIME: Phaser.Timer.SECOND * 3,

	INSTRUCTION_EXPIRE: Phaser.Timer.SECOND * 10,
	RETURN_MESSAGE_DELAY: Phaser.Timer.SECOND * 2
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {
	init: function () {
	},

	preload: function () {

	},

	create: function () {
		this.state.start('Preloader');
	}
};