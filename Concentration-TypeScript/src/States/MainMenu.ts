module StarterProject {
	export class MainMenu extends Phaser.State {
		bg: Phaser.Sprite;
		playButton: Phaser.Button;

		create() {
			console.log((new Date).toISOString() + ' : Entered MainMenu create()');

			this.bg = this.add.sprite(0, 0, 'bg');

			// Handle user input as needed.
			this.playButton = this.add.button(this.game.width / 2, this.game.height / 2, 'playButton', this.startGame, this);
			this.playButton.anchor.setTo(0.5);
		}

		startGame() {
			this.game.state.start('Play');
		}
	}
}