module LevelSelectProject {
	export class CharacterSelection extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection shutdown()');

		}
	}
}