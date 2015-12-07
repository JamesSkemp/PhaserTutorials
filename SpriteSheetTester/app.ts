module JamesRSkemp.SpriteSheetTester {
	export class Game extends Phaser.Game {
		constructor() {
			super(400, 300, Phaser.AUTO, 'content');

			this.state.add('Testing', Testing, true);
		}
	}

	export class Testing extends Phaser.State {
		atlasFrames: Phaser.FrameData;
		currentFrame: number;
		loop: boolean;
		updateImage: boolean = false;
		sprite: Phaser.Sprite;
		timeSinceUpdate: number = 0;
		cursors: Phaser.CursorKeys;

		preload() {
			this.load.path = 'assets/';
			this.load.atlas('atlas', 'Denzi100912-5.png', 'Denzi100912-5.json');
		}

		create() {
			this.stage.backgroundColor = '#f0f';
			this.atlasFrames = this.cache.getFrameData('atlas');

			this.currentFrame = 0;

			this.loop = this.atlasFrames.total > 0;

			if (this.loop) {
				this.sprite = this.game.add.sprite(25, 25, 'atlas', this.currentFrame);
				this.sprite.frame = 9;
				this.sprite.scale.setTo(5);
			}
			this.loop = true;

			var sprite2 = this.game.add.tileSprite(200, 200, 16, 16, 'atlas', 9);
			sprite2.scale.set(5, 5);

			console.log(this.atlasFrames);

			this.cursors = this.game.input.keyboard.createCursorKeys();
		}

		update() {

			if (this.cursors.right.justDown) {
				this.loop = false;
				this.currentFrame++;
				this.updateImage = true;
			} else if (this.cursors.left.justDown) {
				this.loop = false;
				this.currentFrame--;
				this.updateImage = true;
			} else if (this.cursors.up.justDown) {
				this.loop = !this.loop;
			} else if (this.cursors.down.justDown) {
				this.currentFrame += 50;
			}

			if (this.loop) {
				this.timeSinceUpdate += this.game.time.elapsed;

				if (this.timeSinceUpdate >= 500) {
					this.currentFrame++;

					this.updateImage = true;
				}
			}

			if (this.currentFrame >= this.atlasFrames.total) {
				this.currentFrame = 0;
			} else if (this.currentFrame < 0) {
				this.currentFrame = this.atlasFrames.total - 1;
			}

			if (this.updateImage) {
				console.log('Changing to frame ' + this.currentFrame + " = " + this.atlasFrames.getFrame(this.currentFrame).name);

				this.sprite = this.game.add.sprite(25, 25, 'atlas', this.currentFrame);
				this.sprite.scale.setTo(5);
				this.timeSinceUpdate = 0;
				this.updateImage = false;
			}
		}
	}
}

window.onload = () => {
	var game = new JamesRSkemp.SpriteSheetTester.Game();
};