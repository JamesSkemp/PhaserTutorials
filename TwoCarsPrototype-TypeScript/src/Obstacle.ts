module TwoCars {
	export class Obstacle extends Phaser.Sprite {
		obstacleSpeed: number = 120;

		constructor(game: Phaser.Game, x: number, y: number) {
			super(game, x, y, 'obstacle');

			this.anchor.setTo(0.5);

			game.physics.enable(this, Phaser.Physics.ARCADE);
			// TODO tint
		}

		update() {
			this.body.velocity.y = this.obstacleSpeed;

			if (this.y > this.game.height) {
				this.destroy();
			}
		}
	}
}