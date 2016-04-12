module LevelSelectProject {
	export class LevelThumb extends Phaser.Image {
		levelNumber: number;

		constructor(game: Phaser.Game, x: number, y: number, key: string) {
			super(game, x, y, key);
		}
	}
}