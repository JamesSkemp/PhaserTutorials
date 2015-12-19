module RadicalPrototype2 {
	export class Game extends Phaser.State {
		ship: Phaser.Sprite;
		barrierGroup: Phaser.Group;

		shipHorizontalSpeed: number = 400;
		static barrierSpeed: number = 150;
		static barrierDelay: number = 150;

		init() {
			console.log((new Date).toISOString() + ' : Entered Game init()');
			// If you want to scale the game, you can set that here.
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			// If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
			this.game.scale.windowConstraints.bottom = true;

			// Uncomment to place our game in the center of the screen both horizontally and vertically.
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;

			// Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
			this.input.maxPointers = 1;

			// If your game uses a physics system, you can start that here.
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Game preload()');

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			this.load.image('ship');
			this.load.image('barrier');
			this.load.image('wall', 'verticalbarrier.png');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Game create()');
			
			// Create a group to contain the barriers.
			this.barrierGroup = this.add.group();
			
			// Add the player's ship.
			this.ship = this.add.sprite(this.game.width / 2, this.game.height - 40, 'ship');
			this.ship.anchor.setTo(0.5);

			this.game.physics.enable(this.ship);
			(<Phaser.Physics.Arcade.Body>this.ship.body).allowRotation = false;

			// Handle touch inputs.
			this.game.input.onDown.add(this.moveShip, this);
			this.game.input.onUp.add(this.stopShip, this);

			// Create our barriers.
			this.placeBarriers();
		}

		update() {
			if (this.ship.position.x < 0) {
				this.ship.position.x = this.game.width;
			} else if (this.ship.position.x > this.game.width) {
				this.ship.position.x = 0;
			}

			this.game.physics.arcade.collide(this.ship, this.barrierGroup, () => {
				this.game.state.restart();
			});
		}

		placeBarriers() {
			var placeWalls = true;
			if (this.game.rnd.between(0, 9) === 0) {
				// 10% chance we won't add walls.
				placeWalls = false;
			}

			var position = this.game.rnd.between(0, 4);
			// Create the left-most barrier first.
			var barrier = new Barrier(this, position, 1, placeWalls);
			this.game.add.existing(barrier);
			this.barrierGroup.add(barrier);

			// Create the right barrier next.
			barrier = new Barrier(this, position + 1, 0, placeWalls);
			this.game.add.existing(barrier);
			this.barrierGroup.add(barrier);

			if (placeWalls) {
				var wall = new Wall(this.game, 1);
				this.game.add.existing(wall);
				this.barrierGroup.add(wall);

				wall = new Wall(this.game, 0);
				this.game.add.existing(wall);
				this.barrierGroup.add(wall);
			}
		}

		moveShip(input: Phaser.Input) {
			if (input.position.x < this.game.width / 2) {
				// Move to the left.
				this.ship.body.velocity.x = -this.shipHorizontalSpeed;
			} else {
				// Move to the right.
				this.ship.body.velocity.x = this.shipHorizontalSpeed;
			}
		}

		stopShip() {
			this.ship.body.velocity.x = 0;
		}
	}

	export class Barrier extends Phaser.Sprite {
		game: Phaser.Game;
		state: Game;
		createNew: boolean;

		/**
			The world is split into 5 lanes. Two barriers are added per 'line' of them.
		*/
		constructor(state: Game, position: number, anchor: number, placeWalls: boolean) {
			super(state.game, position * ((state.game.width - 40) / 5) + 20, -Game.barrierDelay - 40, 'barrier');

			this.state = state;
			this.game = state.game;

			// Used to determine when to create new barriers.
			this.createNew = anchor === 1;

			this.anchor.setTo(anchor, 0.5);

			this.game.physics.enable(this);

			this.body.velocity.y = Game.barrierSpeed;
		}

		update() {
			if (this.y > this.game.height) {
				this.destroy();
			}

			if (this.createNew && this.y >= - 40) {
				// It's time to create a new set of barriers.
				this.createNew = false;
				this.state.placeBarriers();
			}
		}
	}

	export class Wall extends Phaser.Sprite {
		game: Phaser.Game;

		constructor(game: Phaser.Game, side: number) {
			super(game, game.width * side, -Game.barrierDelay - 40, "wall");

			this.game = game;

			this.anchor.setTo(side, 0);

			// 20 is the height of a horizontal barrier.
			this.height = Game.barrierDelay + 20;

			game.physics.enable(this);

			this.body.velocity.y = Game.barrierSpeed;
		}

		update() {
			if (this.y > this.game.height) {
				this.destroy();
			}
		}
	}
}
