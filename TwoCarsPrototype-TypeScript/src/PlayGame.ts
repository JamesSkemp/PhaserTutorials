﻿module TwoCars {
	export class PlayGame extends Phaser.State {
		cars: Car[] = [];
		static carColors = [0xff0000, 0x0000ff];
		carTurnSpeed = 250;
		carGroup: Phaser.Group;
		obstacleGroup: Phaser.Group;
		targetGroup: Phaser.Group;

		static obstacleSpeed: number = 120;
		obstacleDelay = 1500;

		preload() {
			this.game.load.path = 'assets/';

			this.game.load.image('car');
			this.game.load.image('obstacle');
			this.game.load.image('road');
			this.game.load.image('target');
		}

		create() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.game.add.image(0, 0, 'road');

			this.carGroup = this.game.add.group();
			this.obstacleGroup = this.game.add.group();
			this.targetGroup = this.game.add.group();

			for (var i = 0; i < 2; i++) {
				this.cars[i] = new Car(this.game, 0, this.game.height - 40, i);
				this.carGroup.add(this.cars[i]);
			}

			this.game.input.onDown.add(this.moveCar, this);

			this.game.time.events.loop(this.obstacleDelay, () => {
				for (var i = 0; i < 2; i++) {
					var position = this.game.rnd.between(0, 1) + 2 * i;

					if (this.game.rnd.between(0, 1) == 1) {
						var obstacle = new Obstacle(this.game, this.game.width * (position * 2 + 1) / 8, -20, position);
						this.game.add.existing(obstacle);
						this.obstacleGroup.add(obstacle);
					} else {
						var target = new Target(this.game, this.game.width * (position * 2 + 1) / 8, -20, position);
						this.game.add.existing(target);
						this.targetGroup.add(target);
					}
				}
			});
		}

		update() {
			this.game.physics.arcade.collide(this.carGroup, this.obstacleGroup, () => {
				this.game.state.start('PlayGame');
			});
			this.game.physics.arcade.collide(this.carGroup, this.targetGroup, (c, t) => {
				t.destroy();
			});
		}

		moveCar(e) {
			var carToMove = Math.floor(e.position.x / (this.game.width / 2));

			if (this.cars[carToMove].canMove) {
				this.cars[carToMove].canMove = false;

				var steerTween = this.game.add.tween(this.cars[carToMove]).to({
					angle: 20 - 40 * this.cars[carToMove].side
				}, this.carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
				steerTween.onComplete.add(() => {
					var steerTween = this.game.add.tween(this.cars[carToMove]).to({
						angle: 0
					}, this.carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
				});

				this.cars[carToMove].side = 1 - this.cars[carToMove].side;

				var moveTween = this.game.add.tween(this.cars[carToMove]).to({
					x: this.cars[carToMove].positions[this.cars[carToMove].side]
				}, this.carTurnSpeed, Phaser.Easing.Linear.None, true);
				moveTween.onComplete.add(() => {
					this.cars[carToMove].canMove = true;
				});
			}
		}
	}
}