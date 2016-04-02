module TwentyFortyEightGame {
	export class Tile extends Phaser.Sprite {
		// Current value.
		pos: number;

		constructor(game, x, y) {
			super(game, x, y, 'tile');
		}
	}
}