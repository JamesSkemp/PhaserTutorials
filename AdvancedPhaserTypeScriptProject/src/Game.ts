module Castlevania {
	export class Game extends Phaser.Game {
		constructor() {
			super(800, 600, Phaser.AUTO, 'content', null);
		}
	}
}

window.onload = () => {
	var game = new Castlevania.Game();
};
