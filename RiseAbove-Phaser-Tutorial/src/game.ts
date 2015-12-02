class RiseAboveGame {

	game: Phaser.Game;

	constructor() {
		this.game = new Phaser.Game(320, 480, Phaser.AUTO, 'content', {
			preload: this.preload, create: this.create
		});
	}

	preload() {
	}

	create() {
	}
}

window.onload = () => {
	var game = new RiseAboveGame();
}