﻿module RadicalPrototype2 {
	export class App extends Phaser.Game {
		constructor() {
			console.log((new Date).toISOString() + ' : Entered App constructor()');

			// Update the width (800) and height (600) accordingly.
			super(320, 480, Phaser.AUTO, 'content');

			// Add the game states.
			this.state.add('Game', Game, true);
		}
	}
}

window.onload = () => {
	var game = new RadicalPrototype2.App();
};