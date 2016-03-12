module BoidsProject {
	export class FlockingBehavior extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered FlockingBehavior shutdown()');

		}
	}
}