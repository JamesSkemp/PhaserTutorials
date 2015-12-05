module TwoCars {
	export class Car extends Phaser.Sprite {
		positions: number[];
		canMove: boolean;
		side: number;

		constructor(game: Phaser.Game, x: number, y: number, side: number) {
			super(game, x, y, 'car');

			this.side = side;
			this.canMove = true;
			this.positions = [game.width * (this.side * 4 + 1) / 8, game.width * (this.side * 4 + 3) / 8];
			this.x = this.positions[this.side];

			this.anchor.setTo(0.5);

			this.tint = PlayGame.carColors[side];
			game.physics.enable(this, Phaser.Physics.ARCADE);

			var body: Phaser.Physics.Arcade.Body = this.body;
			body.allowRotation = false;
			body.moves = false;
		}
	}
}