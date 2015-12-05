module TwoCars {
	export class Car extends Phaser.Sprite {
		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'car');

			this.anchor.setTo(0.5);
		}
	}
}