module LevelSelectProject {
	export class Option1Game extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered Option1Game init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Option1Game preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Option1Game create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Option1Game paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Option1Game resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Option1Game shutdown()');

		}
	}
}