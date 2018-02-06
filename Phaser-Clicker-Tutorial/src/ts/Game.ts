import PreloaderState from "./States/Preloader";
import PlayState from "./States/Play";

export default class Game extends Phaser.Game {
	// Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
	//static SOME_VARIABLE: number = 10;

	constructor() {
		console.log((new Date).toISOString() + ' : Entered Game constructor()');

		// Update the width (800) and height (600) accordingly.
		super(800, 600, Phaser.AUTO, 'content');

		this.state.add(PreloaderState.Name, PreloaderState);
		this.state.add(PlayState.Name, PlayState);

		this.state.start(PreloaderState.Name);
	}
}

window.onload = () => {
	var game = new Game();
};

