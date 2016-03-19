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
	create: function () {
		this.setupBackground();
		this.setupPlayer();
		this.setupEnemies();
		this.setupBullets();
		this.setupExplosions();
		this.setupPlayerIcons();
		this.setupText();

		this.setupAudio();

		// Enable keyboard support.
		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
		this.checkCollisions();
		this.spawnEnemies();
		this.enemyFire();
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
		this.weaponLevel = 0;
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
		// Power-up drop rate.
		this.enemyPool.setAll('dropRate', BasicGame.ENEMY_DROP_RATE, false, false, 0, true);

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

		this.shooterPool = this.add.group();
		this.shooterPool.enableBody = true;
		this.shooterPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.shooterPool.createMultiple(20, 'whiteEnemy');
		this.shooterPool.setAll('anchor.x', 0.5);
		this.shooterPool.setAll('anchor.y', 0.5);
		this.shooterPool.setAll('outOfBoundsKill', true);
		this.shooterPool.setAll('checkWorldBounds', true);
		// Set a new property on all enemies.
		this.shooterPool.setAll('reward', BasicGame.SHOOTER_REWARD
			// No matter whether they're alive or visible, and replace the current value (all defaults).
			, false, false, 0
			// Force it, since the property doesn't exist.
			, true);
		// Power-up drop rate.
		this.shooterPool.setAll('dropRate', BasicGame.SHOOTER_DROP_RATE, false, false, 0, true);

		this.enemyPool.forEach(function (enemy) {
			// Animation runs at 20 frames/second, and loops.
			enemy.animations.add('fly', [0, 1, 2], 20, true);
			// Animiation runs at 20 fps and doesn't loop.
			enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
			enemy.events.onAnimationComplete.add(function (e) {
				e.play('fly');
			}, this);
		});

		// Start spawning these enemies after 5 seconds.
		this.nextShooterAt = Phaser.Timer.SECOND * 5;
		this.shooterDelay = BasicGame.SPAWN_SHOOTER_DELAY;

		this.bossPool = this.add.group();
		this.bossPool.enableBody = true;
		this.bossPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.bossPool.createMultiple(1, 'boss');
		this.bossPool.setAll('anchor.x', 0.5);
		this.bossPool.setAll('anchor.y', 0.5);
		this.bossPool.setAll('outOfBoundsKill', true);
		this.bossPool.setAll('checkWorldBounds', true);
		this.bossPool.setAll('reward', BasicGame.BOSS_REWARD, false, false, 0, true);
		this.bossPool.setAll('dropRate', BasicGame.BOSS_DROP_RATE, false, false, 0, true);

		this.bossPool.forEach(function (enemy) {
			enemy.animations.add('fly', [0, 1, 2], 20, true);
			enemy.animations.add('hit', [3, 1, 3, 2], 20, false);
			enemy.events.onAnimationComplete.add(function (e) {
				e.play('fly');
			}, this);
		});

		this.boss = this.bossPool.getTop();
		this.bossApproaching = false;
	},

	setupBullets: function () {
		// Add a pool for all enemy bullets.s
		this.enemyBulletPool = this.add.group();
		this.enemyBulletPool.enableBody = true;
		this.enemyBulletPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.enemyBulletPool.createMultiple(100, 'enemyBullet');
		this.enemyBulletPool.setAll('anchor.x', 0.5);
		this.enemyBulletPool.setAll('anchor.y', 0.5);
		this.enemyBulletPool.setAll('outOfBoundsKill', true);
		this.enemyBulletPool.setAll('checkWorldBounds', true);
		this.enemyBulletPool.setAll('reward', 0, false, false, 0, true);

		// Add a pool for all player bullets, with physics.
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

	setupPlayerIcons: function () {
		this.powerUpPool = this.add.group();
		this.powerUpPool.enableBody = true;
		this.powerUpPool.physicsBodyType = Phaser.Physics.ARCADE;
		this.powerUpPool.createMultiple(5, 'powerup1');
		this.powerUpPool.setAll('anchor.x', 0.5);
		this.powerUpPool.setAll('anchor.y', 0.5);
		this.powerUpPool.setAll('outOfBoundsKill', true);
		this.powerUpPool.setAll('checkWorldBounds', true);
		this.powerUpPool.setAll('reward', BasicGame.POWERUP_REWARD, false, false, 0, true);

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

	setupAudio: function () {
		// Set the volume to 30%.
		this.sound.volume = 0.3;
		this.explosionSFX = this.add.audio('explosion');
		this.playerExplosionSFX = this.add.audio('playerExplosion');
		this.enemyFireSFX = this.add.audio('enemyFire');
		this.playerFireSFX = this.add.audio('playerFire');
		this.powerUpSFX = this.add.audio('powerUp');
	},

	checkCollisions: function () {
		// Bullets damage enemies.
		this.physics.arcade.overlap(this.bulletPool, this.enemyPool, this.enemyHit, null, this);
		this.physics.arcade.overlap(this.bulletPool, this.shooterPool, this.enemyHit, null, this);
		// Enemies damage the player.
		this.physics.arcade.overlap(this.player, this.enemyPool, this.playerHit, null, this);
		this.physics.arcade.overlap(this.player, this.shooterPool, this.playerHit, null, this);
		// Enemy bullets damage the player.
		this.physics.arcade.overlap(this.player, this.enemyBulletPool, this.playerHit, null, this);
		// The player can pickup power-ups.
		this.physics.arcade.overlap(this.player, this.powerUpPool, this.playerPowerUp, null, this);

		if (this.bossApproaching === false) {
			// The boss can only be damaged after it's moved into position.
			this.physics.arcade.overlap(this.bulletPool, this.bossPool, this.enemyHit, null, this);
		}
		this.physics.arcade.overlap(this.player, this.bossPool, this.playerHit, null, this);
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

		if (this.nextShooterAt < this.time.now && this.shooterPool.countDead() > 0) {
			this.nextShooterAt = this.time.now + this.shooterDelay;

			var shooter = this.shooterPool.getFirstExists(false);
			shooter.reset(this.rnd.integerInRange(20, this.game.width - 20), 0, BasicGame.SHOOTER_HEALTH);

			// Choose a random location at the bottom of the screen to move to (X coordinate).
			var target = this.rnd.integerInRange(20, this.game.width - 20);

			shooter.rotation = this.physics.arcade.moveToXY(
				// Object to move
				shooter
				// Random X coordinate from above.
				, target
				// Our Y coordinate will be the bottom of the screen.
				, this.game.height
				// Speed in pixels/second. Defaults to 60.
				, this.rnd.integerInRange(BasicGame.SHOOTER_MIN_VELOCITY, BasicGame.SHOOTER_MAX_VELOCITY)
				// Since our sprites are rotated down, instead of right, initially, take that into account.
			) - Math.PI / 2;

			shooter.play('fly');

			// Each of these enemies has their own shot timer.
			shooter.nextShotAt = 0;
		}
	},

	enemyFire: function () {
		this.shooterPool.forEachAlive(function (enemy) {
			if (this.time.now > enemy.nextShotAt && this.enemyBulletPool.countDead() > 0) {
				var bullet = this.enemyBulletPool.getFirstExists(false);
				bullet.reset(enemy.x, enemy.y);
				this.physics.arcade.moveToObject(bullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
				enemy.nextShotAt = this.time.now + BasicGame.SHOOTER_SHOT_DELAY;
				this.enemyFireSFX.play();
			}
		}, this);

		if (this.bossApproaching === false && this.boss.alive && this.boss.nextShotAt < this.time.now
			&& this.enemyBulletPool.countDead() >= 10) {

			this.boss.nextShotAt = this.time.now + BasicGame.BOSS_SHOT_DELAY;
			this.enemyFireSFX.play();

			for (var i = 0; i < 5; i++) {
				// Setup two bullets at a time.
				var leftBullet = this.enemyBulletPool.getFirstExists(false);
				leftBullet.reset(this.boss.x - 10 - i * 10, this.boss.y + 20);
				var rightBullet = this.enemyBulletPool.getFirstExists(false);
				rightBullet.reset(this.boss.x + 10 + i * 10, this.boss.y + 20);

				if (this.boss.health > BasicGame.BOSS_HEALTH / 2) {
					// Aim directly at the player at 50%+ health.
					this.physics.arcade.moveToObject(leftBullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
					this.physics.arcade.moveToObject(rightBullet, this.player, BasicGame.ENEMY_BULLET_VELOCITY);
				} else {
					// Aim slightly off center of the player, which results in a wider spread.
					this.physics.arcade.moveToXY(leftBullet, this.player.x - i * 100, this.player.y, BasicGame.ENEMY_BULLET_VELOCITY);
					this.physics.arcade.moveToXY(rightBullet, this.player.x + i * 100, this.player.y, BasicGame.ENEMY_BULLET_VELOCITY);
				}
			}
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

		if (this.bossApproaching && this.boss.y > 80) {
			this.bossApproaching = false;
			this.boss.nextShotAt = 0;
			// The boss will move back and forth at the top of the screen.
			this.boss.body.velocity.x = BasicGame.BOSS_X_VELOCITY;
			this.boss.body.velocity.y = 0;
			// Enemy will stay within the world's bounds, bouncing off the 'walls.'
			this.boss.body.bounce.x = 1;
			this.boss.body.collideWorldBounds = true;
		}
	},

	fire: function () {
		if (!this.player.alive || this.nextShotAt > this.time.now) {
			return;
		}

		// Add a delay between shots, in ms.
		this.nextShotAt = this.time.now + this.shotDelay;
		this.playerFireSFX.play();

		var bullet;
		if (this.weaponLevel === 0) {
			if (this.bulletPool.countDead() === 0) {
				return;
			}
			bullet = this.bulletPool.getFirstExists(false);
			bullet.reset(this.player.x, this.player.y - 20);
			bullet.body.velocity.y = -BasicGame.BULLET_VELOCITY;
		} else {
			if (this.bulletPool.countDead() < this.weaponLevel * 2) {
				return;
			}
			for (var i = 0; i < this.weaponLevel; i++) {
				// Spawn a 'left' bullet.
				bullet = this.bulletPool.getFirstExists(false);
				// The left bullet is slightly to the left of center.
				bullet.reset(this.player.x - (10 + i * 6), this.player.y - 20);
				// Spread is from -95 to -135 degrees.
				this.physics.arcade.velocityFromAngle(
					-95 - i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
				);

				// Spawn a 'right' bullet.
				bullet = this.bulletPool.getFirstExists(false);
				// The right bullet is slightly to the right of center.
				bullet.reset(this.player.x + (10 + i * 6), this.player.y - 20);
				// Spread is from -85 to -45 degrees.
				this.physics.arcade.velocityFromAngle(
					-85 + i * 10, BasicGame.BULLET_VELOCITY, bullet.body.velocity
				);
			}
		}
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

		this.playerExplosionSFX.play();

		// Deal crash damage to enemies instead of just killing them.
		this.damageEnemy(enemy, BasicGame.CRASH_DAMAGE);

		// If they have lives left, use one instead of killing the player.
		var life = this.lives.getFirstAlive();
		if (life !== null) {
			life.kill();
			this.weaponLevel = 0;
			this.ghostUntil = this.time.now + BasicGame.PLAYER_GHOST_TIME;
			this.player.play('ghost');
		} else {
			this.explode(player);
			player.kill();
			this.displayEnd(false);
		}
	},

	playerPowerUp: function(player, powerUp) {
		this.addToScore(powerUp.reward);
		powerUp.kill();
		this.powerUpSFX.play();
		if (this.weaponLevel < 5) {
			this.weaponLevel++;
		}
	},

	damageEnemy: function (enemy, damage) {
		// damage() will automatically kill if needed.
		enemy.damage(damage);
		if (enemy.alive) {
			enemy.play('hit');
		} else {
			this.explode(enemy);
			this.explosionSFX.play();
			this.spawnPowerUp(enemy);
			this.addToScore(enemy.reward);
			// If they killed the boss, consider the game to be over.
			// Author's recommendation is to set a flag on the sprites.
			if (enemy.key === 'boss') {
				this.displayEnd(true);
			}
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

	spawnPowerUp: function (enemy) {
		if (this.powerUpPool.countDead() === 0 || this.weaponLevel === 5) {
			return;
		}

		if (this.rnd.frac() < enemy.dropRate) {
			var powerUp = this.powerUpPool.getFirstExists(false);
			powerUp.reset(enemy.x, enemy.y);
			powerUp.body.velocity.y = BasicGame.POWERUP_VELOCITY;
		}
	},

	addToScore: function (score) {
		this.score += score;
		this.scoreText.text = this.score;

		if (this.score >= 20000 && this.bossPool.countDead() === 1) {
			this.spawnBoss();
		}
	},

	spawnBoss: function () {
		this.bossApproaching = true;
		this.boss.reset(this.game.width / 2, 0, BasicGame.BOSS_HEALTH);
		this.physics.enable(this.boss, Phaser.Physics.ARCADE);
		this.boss.body.velocity.y = BasicGame.BOSS_Y_VELOCITY;
		this.boss.play('fly');
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
		// Clean-up after ourselves.
		this.sea.destroy();
		this.player.destroy();
		this.enemyPool.destroy();
		this.bulletPool.destroy();
		this.explosionPool.destroy();
		this.shooterPool.destroy();
		this.enemyBulletPool.destroy();
		this.powerUpPool.destroy();
		this.bossPool.destroy();
		this.instructions.destroy();
		this.scoreText.destroy();
		this.endText.destroy();
		this.returnText.destroy();

		// Return to the main menu.
		this.state.start('MainMenu');
	}
};