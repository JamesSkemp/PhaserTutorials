module HiLoProject {
	export class TheGame extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered TheGame init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered TheGame preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered TheGame create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered TheGame paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered TheGame resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered TheGame shutdown()');

		}
	}
}