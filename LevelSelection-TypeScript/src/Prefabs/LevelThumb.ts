module LevelSelectProject {
	export class LevelThumb extends Phaser.Image {
		levelNumber: number;

		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'levelthumb');
		}
	}
}