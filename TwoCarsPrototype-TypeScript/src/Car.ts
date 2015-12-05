module TwoCars {
	export class Car extends Phaser.Sprite {
		positions: number[];
		canMove: boolean;
		side: number;

		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'car');

			this.anchor.setTo(0.5);
		}
	}
}