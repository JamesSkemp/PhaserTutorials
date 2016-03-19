module HiLoProject {
	export class GameOver extends Phaser.State {
		score: number | string = 0;

		init(score) {
			console.log((new Date).toISOString() + ' : Entered GameOver init()');
			// init can receive parameters.

			this.score = score;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered GameOver preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered GameOver create()');

			var gameOverTitle = this.game.add.sprite(160, 160, 'gameover');
			gameOverTitle.anchor.setTo(0.5);

			var finalScore = this.game.add.text(this.game.width / 2, this.game.height / 2, this.score.toString() + ' correct', { fill: '#fff', fontSize: '32px' });
			finalScore.anchor.setTo(0.5);

			var playButton = this.game.add.button(160, 320, 'play', this.playGame, this);
		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered GameOver paused()');

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered GameOver resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered GameOver shutdown()');

		}

		playGame() {
			this.game.state.start('TheGame');
		}
	}
}