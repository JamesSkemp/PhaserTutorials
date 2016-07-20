module TestingProject {
	export class P2PhysicsExample extends Phaser.State {
		ship;
		starfield;
		cursors;

		init() {
			console.log((new Date).toISOString() + ' : Entered P2PhysicsExample init()');
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered P2PhysicsExample preload()');

			this.game.load.image('stars', 'p2/starfield.jpg');
			this.game.load.spritesheet('ship', 'p2/humstar.png', 32, 32);
			this.game.load.image('panda', 'p2/spinObj_01.png');
			this.game.load.image('sweet', 'p2/spinObj_06.png');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered P2PhysicsExample create()');

			//  Enable P2
			this.game.physics.startSystem(Phaser.Physics.P2JS);

			//  Turn on impact events for the world, without this we get no collision callbacks
			this.game.physics.p2.setImpactEvents(true);

			this.game.physics.p2.restitution = 0.8;

			//  Create our collision groups. One for the player, one for the pandas
			var playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
			var pandaCollisionGroup = this.game.physics.p2.createCollisionGroup();

			//  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
			//  (which we do) - what this does is adjust the bounds to use its own collision group.
			this.game.physics.p2.updateBoundsCollisionGroup();

			this.starfield = this.game.add.tileSprite(0, 0, 800, 600, 'stars');
			this.starfield.fixedToCamera = true;

			var pandas = this.game.add.group();
			pandas.enableBody = true;
			pandas.physicsBodyType = Phaser.Physics.P2JS;

			for (var i = 0; i < 4; i++) {
				var panda = pandas.create(this.game.world.randomX, this.game.world.randomY, 'panda');
				panda.body.setRectangle(40, 40);

				//  Tell the panda to use the pandaCollisionGroup
				panda.body.setCollisionGroup(pandaCollisionGroup);

				//  Pandas will collide against themselves and the player
				//  If you don't set this they'll not collide with anything.
				//  The first parameter is either an array or a single collision group.
				panda.body.collides([pandaCollisionGroup, playerCollisionGroup]);
			}

			//  Create our ship sprite
			this.ship = this.game.add.sprite(200, 200, 'ship');
			this.ship.scale.set(2);
			this.ship.smoothed = false;
			this.ship.animations.add('fly', [0, 1, 2, 3, 4, 5], 10, true);
			this.ship.play('fly');

			this.game.physics.p2.enable(this.ship, false);
			this.ship.body.setCircle(28);
			this.ship.body.fixedRotation = true;

			//  Set the ships collision group
			this.ship.body.setCollisionGroup(playerCollisionGroup);

			//  The ship will collide with the pandas, and when it strikes one the hitPanda callback will fire, causing it to alpha out a bit
			//  When pandas collide with each other, nothing happens to them.
			this.ship.body.collides(pandaCollisionGroup, this.hitPanda, this);

			this.game.camera.follow(this.ship);

			this.cursors = this.game.input.keyboard.createCursorKeys();
		}

		update() {
			this.ship.body.setZeroVelocity();

			if (this.cursors.left.isDown) {
				this.ship.body.moveLeft(200);
			}
			else if (this.cursors.right.isDown) {
				this.ship.body.moveRight(200);
			}

			if (this.cursors.up.isDown) {
				this.ship.body.moveUp(200);
			}
			else if (this.cursors.down.isDown) {
				this.ship.body.moveDown(200);
			}

			if (!this.game.camera.atLimit.x) {
				this.starfield.tilePosition.x += (this.ship.body.velocity.x * 16) * this.game.time.physicsElapsed;
			}

			if (!this.game.camera.atLimit.y) {
				this.starfield.tilePosition.y += (this.ship.body.velocity.y * 16) * this.game.time.physicsElapsed;
			}
		}

		hitPanda(body1, body2) {
			//  body1 is the space ship (as it's the body that owns the callback)
			//  body2 is the body it impacted with, in this case our panda
			//  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
			body2.sprite.alpha -= 0.1;
			body2.sprite.kill();

		}

	}
}