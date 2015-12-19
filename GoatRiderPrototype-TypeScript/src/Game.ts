module GoatRider {
	export class Game extends Phaser.State {
		goat: Phaser.Sprite;
		player;

		deltaSpeed = 10;
		targetX: number;

		isPressed: boolean;
		rounds: number;

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

			this.game.stage.backgroundColor = 0x74af21;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Game preload()');

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			this.load.image('player');
			this.load.image('goat');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Game create()');
			// Start building your game here.
			this.goat = this.add.sprite(this.world.centerX, this.world.height, 'goat');
			this.goat.anchor.setTo(0.5, 1);

			this.player = this.goat.addChild(this.game.make.sprite(0, -this.goat.height + 20, 'player'));
			this.player.anchor.setTo(0.5, 1);

			this.game.physics.enable(this.goat, Phaser.Physics.ARCADE);

			this.rounds = -1;
			this.game.input.onDown.add(() => {
				this.isPressed = true;

				if (this.rounds === -1) {
					if (this.game.rnd.between(0, 1) === 0) {
						this.goatLeft();
					} else {
						this.goatRight();
					}
				}
			});

			this.game.input.onUp.add(() => {
				this.isPressed = false;
			});
		}

		update() {
			if (this.player.x > -this.goat.width / 2 && this.player.x < this.goat.width / 2) {
				if ((this.goat.body.velocity.x > 0 && !this.isPressed)
					|| (this.goat.body.velocity.x < 0 && this.isPressed)) {
					this.player.body.velocity.x = -this.goat.body.velocity.x;
				} else {
					this.player.body.velocity.x = 0;
				}

				if (this.goat.body.velocity.x > 0 && this.goat.x >= this.targetX) {
					this.goatLeft();
				}
				if (this.goat.body.velocity.x < 0 && this.goat.x <= this.targetX) {
					this.goatRight();
				}
			} else {
				this.goat.body.velocity.x = 0;
				this.player.body.velocity.x = 0;
			}
		}

		goatLeft() {
			this.rounds++;
			this.goat.body.velocity.x = this.game.rnd.between(-200 - this.deltaSpeed * this.rounds, -100 - this.deltaSpeed * this.rounds);
			this.targetX = this.game.rnd.between(this.goat.x - this.goat.width / 2, this.goat.width / 2);
			this.goat.tint = 0xffffff;
		}

		goatRight() {
			this.rounds++;
			this.goat.body.velocity.x = this.game.rnd.between(100 + this.deltaSpeed * this.rounds, 200 + this.deltaSpeed * this.rounds);
			this.targetX = this.game.rnd.between(this.goat.x + this.goat.width, this.game.width - this.goat.width / 2);
			this.goat.tint = 0xff0000;
		}
	}
}
