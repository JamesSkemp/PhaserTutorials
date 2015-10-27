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
		this.setupBackground();
		this.setupPlayer();
		this.setupEnemies();
		this.setupBullets();
		this.setupExplosions();
		this.setupPlayerIcons();
		this.setupText();

		// Enable keyboard support.
		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		this.checkCollisions();
		this.spawnEnemies();
		this.processPlayerInput();
		this.processDelayedEffects();
	},
	
	render: function () {
		// Render debugging boxes.
		//this.game.debug.body(this.bullet);
		//this.game.debug.body(this.enemy);
		//this.game.debug.body(this.player);
	},

	setupBackground: function () {
		this.sea = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sea');
		// Automatically scroll the background. Replaces the following in the update():
		// this.sea.tilePosition.y += 0.2;
		this.sea.autoScroll(0, BasicGame.SEA_SCROLL_SPEED);
	},

	setupPlayer: function () {
		this.player = this.add.sprite(this.game.width / 2, this.game.height - 50, 'player');
		this.player.anchor.setTo(0.5);
		this.player.animations.add('fly', [0, 1, 2], 20, true);
		this.player.animations.add('ghost', [3, 0, 3, 1], 20, true);
		this.player.play('fly');
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.speed = BasicGame.PLAYER_SPEED;
		this.player.body.collideWorldBounds = true;
		// Decrease the size of the player's hitbox. Width, height, and then offset based upon anchor.
		this.player.body.setSize(20, 20, 0, -5);
	},

	setupEnemies: function () {
		this.enemyPool = this.add.group();
		this.enemyPool.enableBody = true;
		this.enemyPool.physicsBodyType = Phaser.Physics.ARCADE;
		// Start our pool with 50 enemies.
		this.enemyPool.createMultiple(50, 'greenEnemy');
		this.enemyPool.setAll('anchor.x', 0.5);
		this.enemyPool.setAll('anchor.y', 0.5);
		this.enemyPool.setAll('outOfBoundsKill', true);
		this.enemyPool.setAll('checkWorldBounds', true);
		// Set a new property on all enemies.
		this.enemyPool.setAll('reward', BasicGame.ENEMY_REWARD
			// No matter whether they're alive or visible, and replace the current value (all defaults).
			, false, false, 0
			// Force it, since the property doesn't exist.
			, true);

		this.enemyPool.forEach(function (enemy) {
			// Animation runs at 20 frames/second, and loops.
			enemy.animations.add('fly', [0, 1, 2], 20, true);
			// Animiation runs at 20 fps and doesn't loop.
			enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
			enemy.events.onAnimationComplete.add(function (e) {
				e.play('fly');
			}, this);
		});

		this.nextEnemyAt = 0;
		// 1 second delay when spawning enemies.
		this.enemyDelay = BasicGame.SPAWN_ENEMY_DELAY;
	},

	setupBullets: function () {
		// Add a pool for all bullets, with physics.
		this.bulletPool = this.add.group();
		this.bulletPool.enableBody = true;
		this.bulletPool.physicsBodyType = Phaser.Physics.ARCADE;
		// Start with a pool of 100 bullets, using the first frame in the sprite (if applicable).
		this.bulletPool.createMultiple(100, 'bullet');

		// Set the anchor to the middle for all bullets.
		this.bulletPool.setAll('anchor.x', 0.5);
		this.bulletPool.setAll('anchor.y', 0.5);

		// Kill bullets when they go out of bounds.
		this.bulletPool.setAll('outOfBoundsKill', true);
		this.bulletPool.setAll('checkWorldBounds', true);

		this.nextShotAt = 0;
		this.shotDelay = BasicGame.SHOT_DELAY;
	},

	setupExplosions: function () {
		// Add a pool for our explosion animations.
		this.explosionPool = this.add.group();
		this.explosionPool.enableBody = true;
		this.explosionPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.explosionPool.createMultiple(100, 'explosion');
		this.explosionPool.setAll('anchor.x', 0.5);
		this.explosionPool.setAll('anchor.y', 0.5);
		this.explosionPool.forEach(function (explosion) {
			explosion.animations.add('boom');
		});
	},

	setupPlayerIcons: function() {
		this.lives = this.add.group();

		var firstLifeIconX = this.game.width - 10 - (BasicGame.PLAYER_EXTRA_LIVES * 30);
		for (var i = 0; i < BasicGame.PLAYER_EXTRA_LIVES; i++) {
			var life = this.lives.create(firstLifeIconX + (30 * i), 30, 'player');
			// Scale to half size.
			life.scale.setTo(0.5);
			life.anchor.setTo(0.5);
		}
	},

	setupText: function () {
		this.instructions = this.add.text(this.game.width / 2, this.game.height - 100,
			'Use Arrow Keys to Move, Press Z to Fire\n'
			+ 'Tapping/clicking does both',
			{ font: '20px monospace', fill: '#fff', align: 'center' }
		);
		this.instructions.anchor.setTo(0.5);
		// Expire 10 seconds after displaying.
		this.instExpire = this.time.now + BasicGame.INSTRUCTION_EXPIRE;

		this.score = 0;
		this.scoreText = this.add.text(this.game.width / 2, 30, '' + this.score,
			{ font: '20px monospace', fill: '#fff', align: 'center' }
		);
		this.scoreText.anchor.setTo(0.5);
	},

	checkCollisions: function () {
		// Bullets kill enemies.
		this.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this);
		// Enemies kill the player.
		this.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);
	},

	spawnEnemies: function () {
		if (this.nextEnemyAt < this.time.now && this.enemyPool.countDead() > 0) {
			this.nextEnemyAt = this.time.now + this.enemyDelay;

			// Spawn an enemy at the top of the screen, in a random position.
			var enemy = this.enemyPool.getFirstExists(false);
			// Enemies are placed randomly, with starting health set.
			// enemy.health would be another way to set this. Defaults to 1.
			enemy.reset(this.rnd.integerInRange(20, this.game.width - 20), 0, BasicGame.ENEMY_HEALTH);
			// Randomize the speed of the enemy.
			enemy.body.velocity.y = this.rnd.integerInRange(BasicGame.ENEMY_MIN_Y_VELOCITY, BasicGame.ENEMY_MAX_Y_VELOCITY);
			enemy.play('fly');
		}
	},

	processPlayerInput: function () {
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
		if (this.input.activePointer.isDown
			// Fudge so that the player doesn't bounce around.
			&& this.physics.arcade.distanceToPointer(this.player) > 15) {
			this.physics.arcade.moveToPointer(this.player, this.player.speed);
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.Z)
			|| this.input.activePointer.isDown) {
			
			if (this.returnText && this.returnText.exists) {
				this.quitGame();
			} else {
				this.fire();
			}
		}
	},

	processDelayedEffects: function () {
		if (this.instructions.exists && this.time.now > this.instExpire) {
			this.instructions.destroy();
		}

		if (this.ghostUntil && this.ghostUntil < this.time.now) {
			this.ghostUntil = null;
			this.player.play('fly');
		}

		if (this.showReturn && this.time.now > this.showReturn) {
			this.returnText = this.add.text(this.game.width / 2, this.game.height / 2 + 20,
				'Press Z or Tap Game to go back to the Main Menu',
				{ font: '16px sans-serif', fill: '#fff' }
			);
			this.returnText.anchor.setTo(0.5);
			this.showReturn = false;
		}
	},

	fire: function () {
		if (!this.player.alive || this.nextShotAt > this.time.now) {
			return;
		}

		if (this.bulletPool.countDead() === 0) {
			return;
		}

		// Add a delay between shots, in ms.
		this.nextShotAt = this.time.now + this.shotDelay;

		// Get an available bullet from our pool, and position it where needed.
		var bullet = this.bulletPool.getFirstExists(false);
		bullet.reset(this.player.x, this.player.y - 20);
		// Move up at 500 pixels/second.
		bullet.body.velocity.y = -BasicGame.BULLET_VELOCITY;
	},

	enemyHit: function (bullet, enemy) {
		bullet.kill();
		this.damageEnemy(enemy, BasicGame.BULLET_DAMAGE);
		this.explode(enemy);
	},

	playerHit: function (player, enemy) {
		// If the player is in ghost mode they can't be damaged.
		if (this.ghostUntil && this.ghostUntil > this.time.now) {
			return;
		}

		// Deal crash damage to enemies instead of just killing them.
		this.damageEnemy(enemy, BasicGame.CRASH_DAMAGE);

		// If they have lives left, use one instead of killing the player.
		var life = this.lives.getFirstAlive();
		if (life !== null) {
			life.kill();
			this.ghostUntil = this.time.now + BasicGame.PLAYER_GHOST_TIME;
			this.player.play('ghost');
		} else {
			this.explode(player);
			player.kill();
			this.displayEnd(false);
		}
	},

	damageEnemy: function (enemy, damage) {
		// damage() will automatically kill if needed.
		enemy.damage(damage);
		if (enemy.alive) {
			enemy.play('hit');
		} else {
			this.explode(enemy);
			this.addToScore(enemy.reward);
		}
	},

	explode: function (sprite) {
		if (this.explosionPool.countDead() === 0) {
			return;
		}

		var explosion = this.explosionPool.getFirstExists(false);
		explosion.reset(sprite.x, sprite.y);
		// Run at 15 fps, don't loop, and kill the explosion sprite once the animation has stopped.
		explosion.play('boom', 15, false, true);
		// Add the original sprites velocity to the explosion.
		explosion.body.velocity.x = sprite.body.velocity.x;
		explosion.body.velocity.y = sprite.body.velocity.y;
	},

	addToScore: function (score) {
		this.score += score;
		this.scoreText.text = this.score;

		if (this.score >= 2000) {
			// They reached the win condition.
			this.displayEnd(true);
		}
	},

	displayEnd: function (win) {
		if (this.endText && this.endText.exists) {
			// They already won or lost.
			return;
		}

		var msg = win ? 'You Win!!!' : 'Game Over!';
		this.endText = this.add.text(this.game.width / 2, this.game.height / 2 - 60, msg,
			{ font: '72px serif', fill: '#fff' }
		);
		this.endText.anchor.setTo(0.5, 0);
		this.showReturn = this.time.now + BasicGame.RETURN_MESSAGE_DELAY;
	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');
	}
};