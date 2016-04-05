module LevelSelectProject {
	export class Game extends Phaser.Game {
		// Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
		//static SOME_VARIABLE: number = 10;
		// Array with finished levels and stars collected.
		// 0 = playable yet unfinished level
		// 1, 2, 3 = level finished with 1, 2, 3 stars
		// 4 = locked
		static STARS_ARRAY = [
			0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
			4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
		];

		constructor() {
			console.log((new Date).toISOString() + ' : Entered Game constructor()');

			// Update the width (800) and height (600) accordingly.
			super(320, 480, Phaser.AUTO, 'content');

			// Add the game states.
			this.state.add('Boot', Boot);
			this.state.add('Preloader', Preloader);
			this.state.add('MainMenu', MainMenu);
			this.state.add('Option1', Option1);
			this.state.add('Option1Game', Option1Game);

			// Start the initial game state.
			this.state.start('Boot');
		}
	}
}

window.onload = () => {
	var game = new LevelSelectProject.Game();
};