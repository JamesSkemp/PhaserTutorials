export default class ExampleSprite extends Phaser.Sprite {
	constructor(game: Phaser.Game, x: number, y: number, key?: string) {
		super(game, x, y, key);
		// Use the center of the sprite for positioning.
		this.anchor.setTo(0.5);

		// Uncomment to add this to the game immediately.
		//game.add.existing(this);
	}
}
