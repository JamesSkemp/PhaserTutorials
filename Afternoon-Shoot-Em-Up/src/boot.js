﻿var BasicGame = {
	SEA_SCROLL_SPEED: 12,
	PLAYER_SPEED: 300,
	ENEMY_MIN_Y_VELOCITY: 30,
	ENEMY_MAX_Y_VELOCITY: 60,
	BULLET_VELOCITY: 500,

	SPAWN_ENEMY_DELAY: Phaser.Timer.SECOND,

	SHOT_DELAY: Phaser.Timer.SECOND * 0.1,

	ENEMY_HEALTH: 2,

	BULLET_DAMAGE: 1,
	CRASH_DAMAGE: 5,

	INSTRUCTION_EXPIRE: Phaser.Timer.SECOND * 10,
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