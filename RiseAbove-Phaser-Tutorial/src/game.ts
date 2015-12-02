class RiseAboveGame {

	game: Phaser.Game;

	shipCanMove: boolean;
	ship: Phaser.Sprite;
	shipPosition: number;
	shipPositions: number[];
	shipHorizontalSpeed = 400;
	shipMoveDelay = 500;

	constructor() {
		this.game = new Phaser.Game(320, 480, Phaser.AUTO, 'content', {
			preload: this.preload, create: this.create
		});
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
	}
}

window.onload = () => {
	var game = new RiseAboveGame();
}