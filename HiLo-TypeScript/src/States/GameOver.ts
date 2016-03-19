module HiLoProject {
	export class GameOver extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered GameOver init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered GameOver preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered GameOver create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered GameOver paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered GameOver resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered GameOver shutdown()');

		}
	}
}