module StarterProject {
	export class Game extends Phaser.Game {
		// Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
		//static SOME_VARIABLE: number = 10;

		constructor() {
			console.log((new Date).toISOString() + ' : Entered Game constructor()');

			// Update the width (800) and height (600) accordingly.
			super(300, 300, Phaser.AUTO, 'content');

			// Add the game states.
			this.state.add('Boot', Boot);
			this.state.add('Preloader', Preloader);
			this.state.add('MainMenu', MainMenu);
			this.state.add('Play', Play);

			// Start the initial game state.
			this.state.start('Boot');
		}
	}
}

window.onload = () => {
	var game = new StarterProject.Game();
};