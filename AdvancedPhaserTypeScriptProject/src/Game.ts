module Castlevania {
	export class Game extends Phaser.Game {
		constructor() {
			super(800, 600, Phaser.AUTO, 'content', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);

			this.state.start('Boot');
		}
	}
}

window.onload = () => {
	var game = new Castlevania.Game();
};
