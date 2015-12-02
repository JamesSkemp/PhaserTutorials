class RiseAboveGame extends Phaser.Game {
	game: Phaser.Game;

	constructor() {
		super(320, 480, Phaser.AUTO, 'content');

		this.state.add('Game', Game);
		this.state.start('Game');
	}
}

class Game extends Phaser.State {
	shipCanMove: boolean;
	ship: Phaser.Sprite;
	shipPosition: number;
	shipPositions: number[];
	shipHorizontalSpeed = 400;
	shipMoveDelay = 500;
	// Barriers
	barrierGroup: Phaser.Group;
	barrierDelay = 2000;

	constructor() {
		super();
	}

	preload() {
		this.game.load.path = 'assets/';
		this.game.load.image('ship');
		this.game.load.image('barrier');
	}

	create() {
		this.shipCanMove = true;
		this.shipPosition = 0;
		this.shipPositions = [40, this.game.width - 40];

		this.barrierGroup = this.game.add.group();

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.ship = this.game.add.sprite(this.shipPositions[this.shipPosition], this.game.height - 40, 'ship');
		this.ship.anchor.setTo(0.5);

		this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
		this.ship.body.allowRotation = false;
		this.ship.body.moves = false;

		this.game.input.onDown.add(this.moveShip, this);
		this.game.time.events.loop(this.barrierDelay, () => {
			var barrier = new Barrier(this.game, this.game.width * this.game.rnd.between(0, 1), -20);
			this.game.add.existing(barrier);
			this.barrierGroup.add(barrier);
		});
	}

	update() {
		this.game.physics.arcade.collide(this.ship, this.barrierGroup, () => {
			this.game.state.start('Game');
		});
	}

	moveShip(): void {
		if (this.shipCanMove) {
			this.shipPosition = 1 - this.shipPosition;
			this.shipCanMove = false;

			var moveTween = this.game.add.tween(this.ship).to({
				x: this.shipPositions[this.shipPosition]
			}, this.shipHorizontalSpeed, Phaser.Easing.Linear.None, true);

			moveTween.onComplete.add(() => {
				this.game.time.events.add(this.shipMoveDelay, () => {
					this.shipCanMove = true;
				});
			});
		}
	}
}

class Barrier extends Phaser.Sprite {
	barrierSpeed = 120;

	constructor(game: Phaser.Game, x: number, y: number) {
		super(game, x, y, "barrier");

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.anchor.set(0.5);
	}

	update() {
		this.body.velocity.y = this.barrierSpeed;
		if (this.y > this.game.height) {
			this.destroy();
		}
	}
}

window.onload = () => {
	var game = new RiseAboveGame();
}