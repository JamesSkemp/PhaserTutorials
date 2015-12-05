module TwoCars {
	export class Target extends Phaser.Sprite {
		lane: number;

		constructor(game: Phaser.Game, x: number, y: number, lane: number) {
			super(game, x, y, 'target');

			this.lane = lane;

			this.anchor.setTo(0.5);

			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.tint = PlayGame.carColors[Math.floor(lane / 2)];
		}

		update() {
			this.body.velocity.y = PlayGame.obstacleSpeed;

			if (this.y > this.game.height) {
				this.destroy();
			}
		}
	}
}