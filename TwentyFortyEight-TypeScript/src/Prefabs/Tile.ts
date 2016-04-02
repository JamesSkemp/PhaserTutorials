module TwentyFortyEightGame {
	export class Tile extends Phaser.Sprite {
		pos: number;

		constructor(game, x, y) {
			super(game, x, y, 'tile');
		}
	}
}