class Game extends Phaser.Game {

	constructor() {
		super(640, 400, Phaser.AUTO, "content", State);
	}
}

class State extends Phaser.State {
	preload() {
		this.game.load.path = "assets/";
		this.game.load.image("BG", "bg.jpg");
		this.game.load.atlas("atlas");
	}

	create() {
		this.add.image(0, 0, "BG");
		var dron: Phaser.Sprite = this.add.sprite(320, 100, "atlas", "dron1", this.world);
		dron.anchor.setTo(0.5);
	}
}

window.onload = () => {
	new Game();
};