module HiLoProject {
	export class MainMenu extends Phaser.State {
		create() {
			console.log((new Date).toISOString() + ' : Entered MainMenu create()');

			// Handle user input as needed.
			var gameTitle = this.game.add.sprite(160, 160, 'gametitle');
			gameTitle.anchor.setTo(0.5);

			var playButton = this.game.add.button(160, 320, 'play', this.playGame, this);
			playButton.anchor.setTo(0.5);
		}

		playGame() {
			this.game.state.start('TheGame');
		}
	}
}