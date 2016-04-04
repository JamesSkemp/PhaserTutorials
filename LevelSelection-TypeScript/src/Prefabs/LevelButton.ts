module LevelSelectProject {
	export class LevelButton extends Phaser.Button {
		levelNumber: number;

		constructor(game: Phaser.Game, x: number, y: number, key?: string, callback?: Function, callbackContext?: any) {
			super(game, x, y, key, callback, callbackContext);
		}
	}
}