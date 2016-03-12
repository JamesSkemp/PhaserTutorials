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
			// Used to calculate the centroid.
			var centroidArray = [];
			// Loop through each boid.
			for (var i = 0; i < this.boidsAmount; i++) {
				// Next loop through each boid.
				for (var j = 0; j < this.boidsAmount; j++) {
					// See if the boid is different, and within the sight radius.
					if (i != j && this.boids[i].position.distance(this.boids[j].position) < this.boidRadius) {
						// Keep track of it.
						centroidArray.push(this.boids[j].position);
					}
				}

				var centroid: Phaser.Point;
				// If there are any boids nearby, determine the midpoint.
				if (centroidArray.length > 0) {
					centroid = Phaser.Point.centroid(centroidArray);
				} else {
					// Use a random point.
					centroid = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
				}

				// Rotate the boid towards the centroid.
				this.boids[i].asset.angle = this.boids[i].position.angle(centroid, true);
				// Move towards the centroid.
				this.game.physics.arcade.moveToXY(this.boids[i].asset, centroid.x, centroid.y, this.boidSpeed);
				// Update the stored position.
				this.boids[i].position.set(this.boids[i].asset.x, this.boids[i].asset.y);
			}
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