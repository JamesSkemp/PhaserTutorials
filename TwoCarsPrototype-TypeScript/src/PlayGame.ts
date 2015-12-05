module TwoCars {
	export class PlayGame extends Phaser.State {
		cars = [];
		static carColors = [0xff0000, 0x0000ff];
		carTurnSpeed = 250;
		carGroup: Phaser.Group;
		obstacleGroup: Phaser.Group;
		static obstacleSpeed: number = 120;
		obstacleDelay = 1500;

		preload() {
			this.game.load.path = 'assets/';

			this.game.load.image('car');
			this.game.load.image('obstacle');
			this.game.load.image('road');
		}

		create() {
			this.game.physics.startSystem(Phaser.Physics.ARCADE);

			this.game.add.image(0, 0, 'road');

			this.carGroup = this.game.add.group();
			this.obstacleGroup = this.game.add.group();

			for (var i = 0; i < 2; i++) {
				this.cars[i] = this.game.add.sprite(0, this.game.height - 40, 'car');
				this.cars[i].positions = [this.game.width * (i * 4 + 1) / 8, this.game.width * (i * 4 + 3) / 8];
				this.cars[i].anchor.set(0.5);
				this.cars[i].tint = PlayGame.carColors[i];
				this.cars[i].canMove = true;
				this.cars[i].side = i;
				this.cars[i].x = this.cars[i].positions[this.cars[i].side];
				this.game.physics.enable(this.cars[i], Phaser.Physics.ARCADE);
				this.cars[i].body.allowRotation = false;
				this.cars[i].body.moves = false;
				this.carGroup.add(this.cars[i]);
			}

			this.game.time.events.loop(this.obstacleDelay, () => {
				var position = this.game.rnd.between(0, 3);
				var obstacle = new Obstacle(this.game, this.game.width * (position * 2 + 1) / 8, -20, position);
				this.game.add.existing(obstacle);
				this.obstacleGroup.add(obstacle);
			});
		}

		update() {
			this.game.physics.arcade.collide(this.carGroup, this.obstacleGroup, () => {
				this.game.state.start('PlayGame');
			});
		}
	}
}