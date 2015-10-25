BasicGame.Game = function (game) {
	//  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

	this.game;      //  a reference to the currently running game (Phaser.Game)
	this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
	this.camera;    //  a reference to the game camera (Phaser.Camera)
	this.cache;     //  the game cache (Phaser.Cache)
	this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
	this.load;      //  for preloading assets (Phaser.Loader)
	this.math;      //  lots of useful common math operations (Phaser.Math)
	this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
	this.stage;     //  the game stage (Phaser.Stage)
	this.time;      //  the clock (Phaser.Time)
	this.tweens;    //  the tween manager (Phaser.TweenManager)
	this.state;     //  the state manager (Phaser.StateManager)
	this.world;     //  the game world (Phaser.World)
	this.particles; //  the particle manager (Phaser.Particles)
	this.physics;   //  the physics manager (Phaser.Physics)
	this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

	//  You can use any of these from any function within this State.
	//  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};

BasicGame.Game.prototype = {
	preload: function () {
		this.load.path = 'assets/';
		this.load.image('sea');
		this.load.image('bullet');
		// Each tile is 32x32 pixels.
		this.load.spritesheet('greenEnemy', 'enemy.png', 32, 32);
	},

	create: function () {
		this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

		this.enemy = this.add.sprite(400, 200, 'greenEnemy');
		this.enemy.animations.add('fly', [0, 1, 2], 20, true);
		this.enemy.play('fly');

		this.bullet = this.add.sprite(400, 300, 'bullet');
	},

	update: function () {
		// Scroll the sea background.
		this.sea.tilePosition.y += 0.2;
	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');
	}
};