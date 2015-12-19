module StarterSimpleProject {
	export class Game extends Phaser.State {
		ship: Phaser.Sprite;
		barrierGroup: Phaser.Group;

		shipHorizontalSpeed: number = 400;
		barrierSpeed: number = 150;
		barrierDelay: number = 1200;

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
		}

		update() {
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
}
