module StarterProject {
	export class ExampleButton extends Phaser.Button {
		constructor(game: Phaser.Game, x: number, y: number, key?: string, callback?: Function, callbackContext?: any) {
			super(game, x, y, key, callback, callbackContext);
		}
	}
}