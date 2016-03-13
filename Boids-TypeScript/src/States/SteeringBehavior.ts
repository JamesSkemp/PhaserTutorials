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