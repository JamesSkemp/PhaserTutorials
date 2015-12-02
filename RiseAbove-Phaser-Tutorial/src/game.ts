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

	constructor() {
		super();
	}

	preload() {
		this.game.load.path = 'assets/';
		this.game.load.image('ship');
	}

	create() {
		this.shipCanMove = true;
		this.shipPosition = 0;
		this.shipPositions = [40, this.game.width - 40];

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		this.ship = this.game.add.sprite(this.shipPositions[this.shipPosition], this.game.height - 40, 'ship');
		this.ship.anchor.setTo(0.5);

		this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
		this.ship.body.allowRotation = false;
		this.ship.body.moves = false;

		this.game.input.onDown.add(this.moveShip, this);
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

window.onload = () => {
	var game = new RiseAboveGame();
}