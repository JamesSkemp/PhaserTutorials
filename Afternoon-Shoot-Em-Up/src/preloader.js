BasicGame.Preloader = function (game) {
	this.background = null;
	this.preloadBar = null;

};

BasicGame.Preloader.prototype = {
	preload: function () {
		this.stage.backgroundColor = '#2d2d2d';

		this.preloadBar = this.add.sprite(this.game.width / 2 - 100, this.game.height / 2, 'preloaderBar');
		this.add.text(this.game.width / 2, this.game.height / 2 - 30, "Loading...", { font: "32px monospace", fill: "#fff" }).anchor.setTo(0.5, 0.5);

		// THis will automatically crop the sprite from 0 to full width as assets are loaded.
		this.load.setPreloadSprite(this.preloadBar);

		// Assets we want to load in.
		this.load.path = 'assets/';
		this.load.image('titlepage');
		this.load.image('sea');
		this.load.image('bullet');
		this.load.image('enemyBullet', 'enemy-bullet.png');
		this.load.image('powerup1');
		// Each tile is 32x32 pixels.
		this.load.spritesheet('greenEnemy', 'enemy.png', 32, 32);
		this.load.spritesheet('whiteEnemy', 'shooting-enemy.png', 32, 32);
		this.load.spritesheet('boss', 'boss.png', 93, 75);
		this.load.spritesheet('explosion', 'explosion.png', 32, 32);
		this.load.spritesheet('player', 'player.png', 64, 64);
		// Sound effects.
		this.load.audio('explosion', ['explosion.ogg', 'explosion.wav']);
		this.load.audio('playerExplosion', ['player-explosion.ogg', 'player-explosion.wav']);
		this.load.audio('enemyFire', ['enemy-fire.ogg', 'enemy-fire.wav']);
		this.load.audio('playerFire', ['player-fire.ogg', 'player-fire.wav']);
		this.load.audio('powerUp', ['powerup.ogg', 'powerup.wav']);
	},

	create: function () {
	},

	update: function () {
		this.state.start('MainMenu');
	}
};