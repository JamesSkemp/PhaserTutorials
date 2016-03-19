module HiLoProject {
	export class GameOver extends Phaser.State {
		init(score) {
			console.log((new Date).toISOString() + ' : Entered GameOver init()');
			// init can receive parameters.

			alert('Score: ' + score);
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