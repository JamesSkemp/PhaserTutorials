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
		this.load.spritesheet('explosion', 'explosion.png', 32, 32);
		this.load.spritesheet('player', 'player.png', 64, 64);
	},

	create: function () {
		this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');

		this.player = this.add.sprite(400, 550, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('fly', [0, 1, 2], 20, true);
		this.player.play('fly');
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.speed = 300;
		this.player.body.collideWorldBounds = true;

		this.enemy = this.add.sprite(400, 200, 'greenEnemy');
		// Animation runs at 20 frames/second, and loops.
		this.enemy.animations.add('fly', [0, 1, 2], 20, true);
		this.enemy.play('fly');
		this.enemy.anchor.setTo(0.5);
		this.physics.enable(this.enemy, Phaser.Physics.ARCADE);

		this.bullet = this.add.sprite(400, 300, 'bullet');
		this.bullet.anchor.setTo(0.5);
		this.physics.enable(this.bullet, Phaser.Physics.ARCADE);
		// 100 pixels/second.
		this.bullet.body.velocity.y = -100;

		// Enable keyboard support.
		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		// Scroll the sea background.
		this.sea.tilePosition.y += 0.2;

		this.physics.arcade.overlap(this.bullet, this.enemy, this.enemyHit, null, this);

		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;

		if (this.cursors.left.isDown) {
			this.player.body.velocity.x = -this.player.speed;
		} else if (this.cursors.right.isDown) {
			this.player.body.velocity.x = this.player.speed;
		}

		if (this.cursors.up.isDown) {
			this.player.body.velocity.y = -this.player.speed;
		} else if (this.cursors.down.isDown) {
			this.player.body.velocity.y = this.player.speed;
		}

		// Move to where the user is clicking/touching.
		if (this.input.activePointer.isDown) {
			this.physics.arcade.moveToPointer(this.player, this.player.speed);
		}
	},
	
	render: function () {
		// Render debugging boxes.
		//this.game.debug.body(this.bullet);
		//this.game.debug.body(this.enemy);
	},

	enemyHit: function (bullet, enemy) {
		bullet.kill();
		enemy.kill();

		var explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
		explosion.anchor.setTo(0.5);
		explosion.animations.add('boom');
		// Run at 15 fps, don't loop, and kill the explosion sprite once the animation has stopped.
		explosion.play('boom', 15, false, true);
	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');
	}
};