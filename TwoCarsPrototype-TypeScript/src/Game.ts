module TwoCars {
	export class Game extends Phaser.Game {
		constructor() {
			super(320, 480, Phaser.AUTO, 'content');

			this.state.add('PlayGame', PlayGame);

			this.state.start('PlayGame');
		}
	}
}

window.onload = () => {
	var game = new TwoCars.Game();
};