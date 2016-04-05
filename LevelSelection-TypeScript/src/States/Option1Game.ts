module LevelSelectProject {
	export class Option1Game extends Phaser.State {
		level: number;

		init(levelNumber: number) {
			console.log((new Date).toISOString() + ' : Entered Option1Game init()');
			// init can receive parameters.

			this.level = levelNumber;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Option1Game preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Option1Game create()');

			var style = {
				font: '32px Arial',
				fill: '#fff'
			};

			var levelTitle = this.game.add.text(0, 0, 'Playing Level ' + this.level, style);
			levelTitle.align = 'center';
			levelTitle.x = (this.game.width - levelTitle.width) / 2;

			for (var i = 0; i <= 3; i++) {
				var gameThumb = this.game.add.button(this.game.width / 2, 90 * (i + 1), 'game', this.levelFinished, this);
				gameThumb.anchor.setTo(0.5);
				gameThumb.frame = i;
			}
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Option1Game paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Option1Game resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Option1Game shutdown()');

		}

		levelFinished() {

		}
	}
}