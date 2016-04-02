module TwentyFortyEightGame {
	export class Game extends Phaser.Game {
		// Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
		static TILE_SIZE = 100;

		constructor() {
			console.log((new Date).toISOString() + ' : Entered Game constructor()');

			// Update the width (800) and height (600) accordingly.
			super(Game.TILE_SIZE * 4, Game.TILE_SIZE * 4, Phaser.AUTO, 'content');

			// Add the game states.
			this.state.add('Boot', Boot);
			this.state.add('Preloader', Preloader);
			this.state.add('MainMenu', MainMenu);

			// Start the initial game state.
			this.state.start('Boot');
		}
	}
}

window.onload = () => {
	var game = new TwentyFortyEightGame.Game();
};