module BoidsProject {
	export class FlockingBehavior extends Phaser.State {

		// Number of boids.
		boidsAmount = 50;
		// Speed of each boid, in pixels per second.
		boidSpeed = 100;
		// Boid sight radius.
		boidRadius = 50;
		// Boids.
		boids = [];

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

			for (var i = 0; i < this.boidsAmount; i++) {
				var randomPoint = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
				this.boids[i] = {
					position: randomPoint,
					asset: this.game.add.sprite(randomPoint.x, randomPoint.y, 'boid')
				}
				this.boids[i].asset.anchor.set(0.5);
				// Enable physics.
				this.game.physics.enable(this.boids[i].asset, Phaser.Physics.ARCADE);
				// Allow boids to rotate.
				this.boids[i].asset.body.allowRotation = false;
			}
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