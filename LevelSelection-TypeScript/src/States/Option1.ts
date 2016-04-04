module LevelSelectProject {
	export class Option1 extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered Option1 init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Option1 preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Option1 create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Option1 paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Option1 resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Option1 shutdown()');

		}
	}
}