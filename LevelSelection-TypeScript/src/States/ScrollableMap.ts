module LevelSelectProject {
	export class ScrollableMap extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap shutdown()');

		}
	}
}