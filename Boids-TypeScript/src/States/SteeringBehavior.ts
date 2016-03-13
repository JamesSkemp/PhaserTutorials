module BoidsProject {
	export class SteeringBehavior extends Phaser.State {
		boidsAmount = 5;
		boids = [];
		target: Phaser.Sprite;

		init() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior init()');
			// init can receive parameters.
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior create()');

			this.target = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'target');
			this.target.anchor.setTo(0.5);
			
			for (var i = 0; i < this.boidsAmount; i++) {
				var randomPoint = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
				this.boids[i] = this.game.add.sprite(randomPoint.x, randomPoint.y, 'boid');
				this.boids[i].anchor.setTo(0.5);
				this.boids[i].speed = this.game.rnd.between(50, 150);
				this.boids[i].force = this.game.rnd.between(5, 25);
				this.game.physics.enable(this.boids[i], Phaser.Physics.ARCADE);
				this.boids[i].body.allowRotation = false;
			}
		}

		update() {
			for (var i = 0; i < this.boidsAmount; i++) {
				// Direction vector from the current boid to the target.
				var direction = new Phaser.Point(this.target.x, this.target.y);
				// Subtract the current boid's location.
				direction.subtract(this.boids[i].x, this.boids[i].y);
				// Normalize - vector length is 1 but direction remains the same.
				direction.normalize();
				// Set length equal to the boid's speed.
				direction.setMagnitude(this.boids[i].speed);
				// Subtract current velocity.
				direction.subtract(this.boids[i].body.velocity.x, this.boids[i].body.velocity.y);
				direction.normalize();
				// Now set magnitude equal to force.
				direction.setMagnitude(this.boids[i].force);

				this.boids[i].body.velocity.add(direction.x, direction.y);
				this.boids[i].body.velocity.normalize();
				(<Phaser.Physics.Arcade.Body>(this.boids[i].body)).velocity.setMagnitude(this.boids[i].speed);
				this.boids[i].angle = 180 + Phaser.Math.radToDeg(Phaser.Point.angle(this.boids[i].position, new Phaser.Point(this.boids[i].x + this.boids[i].body.velocity.x, this.boids[i].y + this.boids[i].body.velocity.y)));

				if (this.boids[i].position.distance(this.target.position) < 2) {
					this.target.x = this.game.rnd.between(10, this.game.width - 10);
					this.target.y = this.game.rnd.between(10, this.game.height - 10);
				}
			}
		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior paused()');
		}

		pauseUpdate() {
		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior resumed()');
		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered SteeringBehavior shutdown()');
		}
	}
}