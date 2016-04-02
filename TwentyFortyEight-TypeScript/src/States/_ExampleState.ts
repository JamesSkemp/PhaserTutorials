module StarterProject {
	export class ExampleState extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered ExampleState init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered ExampleState preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered ExampleState create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered ExampleState paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered ExampleState resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered ExampleState shutdown()');

		}
	}
}